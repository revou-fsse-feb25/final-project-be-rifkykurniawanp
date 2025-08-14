import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/request/register.dto';
import { LoginDto } from './dto/request/login.dto';
import * as bcrypt from 'bcrypt';
import { AuthResponseDto } from './dto/response/auth-response.dto';
import { AuthError } from './enum/auth-error.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    const email = dto.email.toLowerCase();

    // Cek apakah email sudah ada
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new ConflictException(AuthError.EMAIL_EXISTS);
    }

    // Hash password
    const hashed = await bcrypt.hash(dto.password, 10);

    // Simpan user baru
    // Karena role adalah relasi, kita asumsikan role default punya id 1 (sesuaikan dengan data kamu)
    const user = await this.prisma.user.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email,
        password: hashed,
        role: { connect: { id: 1 } }, // connect ke role dengan id 1 (default user)
      },
      include: {
        role: true, // supaya nanti bisa akses user.role.name
      },
    });

    return this.generateToken(user.id, user.email, user.role?.name ?? 'user');
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const email = dto.email.toLowerCase();

    // Cari user termasuk role-nya
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) {
      throw new UnauthorizedException(AuthError.INVALID_CREDENTIALS);
    }

    // Cek password
    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException(AuthError.INVALID_CREDENTIALS);
    }

    return this.generateToken(user.id, user.email, user.role?.name ?? 'user');
  }

  private generateToken(id: number, email: string, role: string): AuthResponseDto {
    const payload = { sub: id, email, role };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
      tokenType: 'Bearer',
    };
  }
}
