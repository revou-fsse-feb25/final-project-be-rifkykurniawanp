import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/request/register.dto';
import { LoginDto } from './dto/request/login.dto';
import * as bcrypt from 'bcrypt';
import { AuthResponseDto, UserPayloadDto } from './dto/response/auth-response.dto';
import { AuthError } from './enum/auth-error.enum';
import { RoleName } from '@prisma/client';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    try {
      // Check if user already exists
      const existingUser = await this.prisma.user.findUnique({ 
        where: { email: dto.email.toLowerCase().trim() } 
      });
        
      if (existingUser) {
        throw new ConflictException(AuthError.EMAIL_EXISTS);
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(dto.password, SALT_ROUNDS);

      // Create user with all provided fields
      const userData = {
        email: dto.email.toLowerCase().trim(),
        password: hashedPassword,
        role: dto.role as RoleName,
        // Optional fields - only include if provided and not empty
        ...(dto.firstName && dto.firstName.trim() && { firstName: dto.firstName.trim() }),
        ...(dto.lastName && dto.lastName.trim() && { lastName: dto.lastName.trim() }),
        ...(dto.phone && dto.phone.trim() && { phone: dto.phone.trim() }),
        ...(dto.address && dto.address.trim() && { address: dto.address.trim() }),
        // Boolean fields - include if explicitly provided
        ...(dto.isBuyer !== undefined && { isBuyer: dto.isBuyer }),
        ...(dto.isStudent !== undefined && { isStudent: dto.isStudent }),
      };

      const user = await this.prisma.user.create({
        data: userData,
        select: {
          id: true,
          email: true,
          role: true,
          firstName: true,
          lastName: true,
          phone: true,
          address: true,
          isBuyer: true,
          isStudent: true,
          createdAt: true,
        },
      });

      // Generate and return token
      return this.generateToken(user.id, user.email, user.role);
    } catch (error) {
      // Re-throw known errors
      if (error instanceof ConflictException) {
        throw error;
      }
      
      // Log unexpected errors for debugging
      console.error('Registration error:', error);
      throw new Error('Registration failed. Please try again.');
    }
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    try {
      // Find user by email (case insensitive)
      const user = await this.prisma.user.findUnique({ 
        where: { email: dto.email.toLowerCase().trim() },
        select: {
          id: true,
          email: true,
          password: true,
          role: true,
        },
      });

      if (!user) {
        throw new UnauthorizedException(AuthError.INVALID_CREDENTIALS);
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(dto.password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException(AuthError.INVALID_CREDENTIALS);
      }

      // Generate and return token
      return this.generateToken(user.id, user.email, user.role);
    } catch (error) {
      // Re-throw known errors
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      
      // Log unexpected errors for debugging
      console.error('Login error:', error);
      throw new UnauthorizedException(AuthError.INVALID_CREDENTIALS);
    }
  }

  /**
   * Generate JWT token and user payload
   */
  private generateToken(id: number, email: string, role: RoleName): AuthResponseDto {
    const payload = { 
      sub: id, 
      email: email.toLowerCase(), 
      role 
    };
    
    const accessToken = this.jwtService.sign(payload);
    
    const user: UserPayloadDto = { 
      id, 
      email: email.toLowerCase(), 
      role 
    };
    
    return { accessToken, user };
  }

  /**
   * Get user profile by ID
   */
  async getUserProfile(userId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          address: true,
          role: true,
          isBuyer: true,
          isStudent: true,
          createdAt: true,
        },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return user;
    } catch (error) {
      console.error('Get user profile error:', error);
      throw new UnauthorizedException('Failed to get user profile');
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: number, updateData: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
  }) {
    try {
      // Only update fields that are provided and not empty
      const dataToUpdate: any = {};
      
      if (updateData.firstName !== undefined) {
        dataToUpdate.firstName = updateData.firstName.trim() || null;
      }
      if (updateData.lastName !== undefined) {
        dataToUpdate.lastName = updateData.lastName.trim() || null;
      }
      if (updateData.phone !== undefined) {
        dataToUpdate.phone = updateData.phone.trim() || null;
      }
      if (updateData.address !== undefined) {
        dataToUpdate.address = updateData.address.trim() || null;
      }

      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: dataToUpdate,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          address: true,
          role: true,
          isBuyer: true,
          isStudent: true,
        },
      });

      return updatedUser;
    } catch (error) {
      console.error('Update profile error:', error);
      throw new Error('Failed to update profile');
    }
  }

  /**
   * Change password
   */
  async changePassword(userId: number, currentPassword: string, newPassword: string) {
    try {
      // Get user with current password
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, password: true },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Verify current password
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        throw new UnauthorizedException('Current password is incorrect');
      }

      // Hash new password
      const hashedNewPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

      // Update password
      await this.prisma.user.update({
        where: { id: userId },
        data: { password: hashedNewPassword },
      });

      return { message: 'Password changed successfully' };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      console.error('Change password error:', error);
      throw new Error('Failed to change password');
    }
  }

  /**
   * Verify JWT token and return user info
   */
  async verifyToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.getUserProfile(payload.sub);
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}