"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const auth_error_enum_1 = require("./enum/auth-error.enum");
const SALT_ROUNDS = 10;
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(dto) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: { email: dto.email.toLowerCase().trim() }
            });
            if (existingUser) {
                throw new common_1.ConflictException(auth_error_enum_1.AuthError.EMAIL_EXISTS);
            }
            const hashedPassword = await bcrypt.hash(dto.password, SALT_ROUNDS);
            const userData = {
                email: dto.email.toLowerCase().trim(),
                password: hashedPassword,
                role: dto.role,
                ...(dto.firstName && dto.firstName.trim() && { firstName: dto.firstName.trim() }),
                ...(dto.lastName && dto.lastName.trim() && { lastName: dto.lastName.trim() }),
                ...(dto.phone && dto.phone.trim() && { phone: dto.phone.trim() }),
                ...(dto.address && dto.address.trim() && { address: dto.address.trim() }),
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
            return this.generateToken(user.id, user.email, user.role);
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            console.error('Registration error:', error);
            throw new Error('Registration failed. Please try again.');
        }
    }
    async login(dto) {
        try {
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
                throw new common_1.UnauthorizedException(auth_error_enum_1.AuthError.INVALID_CREDENTIALS);
            }
            const isPasswordValid = await bcrypt.compare(dto.password, user.password);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException(auth_error_enum_1.AuthError.INVALID_CREDENTIALS);
            }
            return this.generateToken(user.id, user.email, user.role);
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            console.error('Login error:', error);
            throw new common_1.UnauthorizedException(auth_error_enum_1.AuthError.INVALID_CREDENTIALS);
        }
    }
    generateToken(id, email, role) {
        const payload = {
            sub: id,
            email: email.toLowerCase(),
            role
        };
        const accessToken = this.jwtService.sign(payload);
        const user = {
            id,
            email: email.toLowerCase(),
            role
        };
        return { accessToken, user };
    }
    async getUserProfile(userId) {
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
                throw new common_1.UnauthorizedException('User not found');
            }
            return user;
        }
        catch (error) {
            console.error('Get user profile error:', error);
            throw new common_1.UnauthorizedException('Failed to get user profile');
        }
    }
    async updateProfile(userId, updateData) {
        try {
            const dataToUpdate = {};
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
        }
        catch (error) {
            console.error('Update profile error:', error);
            throw new Error('Failed to update profile');
        }
    }
    async changePassword(userId, currentPassword, newPassword) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
                select: { id: true, password: true },
            });
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
            if (!isCurrentPasswordValid) {
                throw new common_1.UnauthorizedException('Current password is incorrect');
            }
            const hashedNewPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
            await this.prisma.user.update({
                where: { id: userId },
                data: { password: hashedNewPassword },
            });
            return { message: 'Password changed successfully' };
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            console.error('Change password error:', error);
            throw new Error('Failed to change password');
        }
    }
    async verifyToken(token) {
        try {
            const payload = this.jwtService.verify(token);
            const user = await this.getUserProfile(payload.sub);
            return user;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map