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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("./users.repository");
const bcrypt = __importStar(require("bcrypt"));
let UsersService = class UsersService {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(dto) {
        if (await this.usersRepository.findByEmail(dto.email)) {
            throw new common_1.BadRequestException('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = await this.usersRepository.create({ ...dto, password: hashedPassword });
        return this.toResponseDto(user);
    }
    async findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        return (await this.usersRepository.findAll(skip, limit)).map(this.toResponseDto);
    }
    async findOne(id, currentUserId, currentUserRole) {
        const user = await this.usersRepository.findById(id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (currentUserRole !== 'ADMIN' || currentUserId !== id) {
            throw new common_1.ForbiddenException('You can only access your own profile');
        }
        return this.toResponseDto(user);
    }
    async findByRole(role) {
        return (await this.usersRepository.findByRole(role)).map(this.toResponseDto);
    }
    async update(id, dto, currentUserId, currentUserRole) {
        if (!(await this.usersRepository.findById(id))) {
            throw new common_1.NotFoundException('User not found');
        }
        if (currentUserRole !== 'ADMIN' && currentUserId !== id) {
            throw new common_1.ForbiddenException('You can only update your own profile');
        }
        if (dto.role && currentUserRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('Only admins can change user roles');
        }
        return this.toResponseDto(await this.usersRepository.update(id, dto));
    }
    async remove(id) {
        if (!(await this.usersRepository.findById(id))) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.usersRepository.delete(id);
    }
    toResponseDto = (user) => {
        const { password, ...rest } = user;
        return rest;
    };
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], UsersService);
//# sourceMappingURL=users.service.js.map