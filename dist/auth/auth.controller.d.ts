import { AuthService } from './auth.service';
import { RegisterDto } from './dto/request/register.dto';
import { LoginDto } from './dto/request/login.dto';
import { AuthResponseDto } from './dto/response/auth-response.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<AuthResponseDto>;
    login(dto: LoginDto): Promise<AuthResponseDto>;
}
