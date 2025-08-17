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
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException(AuthError.EMAIL_EXISTS);

    const hashed = await bcrypt.hash(dto.password, SALT_ROUNDS);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashed,
        role: dto.role as RoleName, // ✅ cast ke enum Prisma
      },
    });

    return this.generateToken(user.id, user.email, user.role);
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException(AuthError.INVALID_CREDENTIALS);

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException(AuthError.INVALID_CREDENTIALS);

    return this.generateToken(user.id, user.email, user.role);
  }

  private generateToken(id: number, email: string, role: RoleName): AuthResponseDto {
    const payload = { sub: id, email, role };
    const accessToken = this.jwtService.sign(payload);

    const user: UserPayloadDto = { id, email, role };

    return { accessToken, user };
  }
}
