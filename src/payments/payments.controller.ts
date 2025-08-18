import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseGuards,
  Query,
  Req,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/request/create-payment.dto';
import { UpdatePaymentDto } from './dto/request/update-payment.dto';
import {
  PaymentResponseDto,
  PaginatedPaymentResponseDto,
  PaymentQueryDto,
} from './dto/response/payment.response.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guards/role.guard';
import { User as GetUser } from '../auth/decorator/user.decorator';
import { PaymentStatus, User } from '@prisma/client';

@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @Get()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'ADMIN: Get all payments with optional filters' })
  @ApiResponse({ status: 200, type: PaginatedPaymentResponseDto })
  async findAll(
    @Query() query: PaymentQueryDto,
  ): Promise<PaginatedPaymentResponseDto> {
    return this.service.findAll(query);
  }

  @Get(':id')
  @Roles('ADMIN', 'USER')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'ADMIN/USER: Get payment by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: PaymentResponseDto })
  async findOne(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<PaymentResponseDto> {
    const payment = await this.service.findOne(id);
    if (user.role === 'ADMIN' || payment.userId === user.id) {
      return payment;
    }
    throw new NotFoundException(`Payment with ID ${id} not found`);
  }

  @Post()
  @ApiOperation({ summary: 'USER: Create a new payment' })
  @ApiBody({ type: CreatePaymentDto })
  @ApiResponse({ status: 201, type: PaymentResponseDto })
  async create(
    @Body() dto: CreatePaymentDto,
    @GetUser() user: User,
  ): Promise<PaymentResponseDto> {
    return this.service.create({ ...dto, userId: user.id });
  }

  @Put(':id')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'ADMIN: Update a payment (status or other fields)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdatePaymentDto })
  @ApiResponse({ status: 200, type: PaymentResponseDto })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdatePaymentDto,
  ): Promise<PaymentResponseDto> {
    return this.service.update(id, dto);
  }

  @Get('user/:userId')
  @Roles('ADMIN', 'USER')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'ADMIN/USER: Get payments by user' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, type: [PaymentResponseDto] })
  async findByUser(
    @Param('userId') userId: number,
    @GetUser() user: User,
  ): Promise<PaymentResponseDto[]> {
    if (user.role === 'ADMIN' || user.id === userId) {
      return this.service.findByUser(userId);
    }
    throw new ForbiddenException('You do not have permission to access this resource');
  }

  @Post(':id/verify')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'ADMIN: Manually verify a payment' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: PaymentResponseDto })
  async verify(@Param('id') id: number): Promise<PaymentResponseDto> {
    return this.service.processPayment(id);
  }

  @Post('webhook')
  @ApiOperation({ summary: 'SYSTEM: Payment gateway webhook' })
  @ApiResponse({ status: 200, description: 'Webhook received' })
  async webhook(@Body() payload: any, @Req() req: any): Promise<void> {
    await this.service.handleWebhook(payload, req);
  }

  @Post(':id/cancel')
  @Roles('ADMIN', 'USER')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'ADMIN/USER: Cancel a payment' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: PaymentResponseDto })
  async cancel(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<PaymentResponseDto> {
    const payment = await this.service.findOne(id);
    if (user.role === 'ADMIN' || payment.userId === user.id) {
      return this.service.updateStatus(id, PaymentStatus.CANCELLED);
    }
    throw new ForbiddenException('You do not have permission to cancel this payment');
  }
}
