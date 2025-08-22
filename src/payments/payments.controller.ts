// src/payments/payments.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PaymentStatus, PayableType } from '@prisma/client';
import { PaymentService } from './payments.service';
import { CreatePaymentDto } from './dto/request/create-payment.dto';
import { UpdatePaymentDto } from './dto/request/update-payment.dto.ts';
import { PaymentResponseDto } from './dto/response/payment.response.dto';
import { PaymentStatsDto } from './dto/response/payment-stat.response.dto';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorator/roles.decorator';

@ApiTags('Payments')
@Controller('payments')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'USER')
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({ status: 201, type: PaymentResponseDto })
  create(@Body() dto: CreatePaymentDto, @Request() req: any) {
    const { user } = req;
    return this.paymentsService.create(dto, user?.sub, user?.role);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Get()
  @ApiOperation({ summary: 'Get all payments with pagination (Admin only)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, type: [PaymentResponseDto] })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Request() req?: any,
  ) {
    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 10;
    const { user } = req;
    return this.paymentsService.findAll(pageNum, limitNum, user?.role);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Get('deleted')
  @ApiOperation({ summary: 'Get soft deleted payments (Admin only)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, type: [PaymentResponseDto] })
  getDeleted(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Request() req?: any,
  ) {
    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 10;
    const { user } = req;
    return this.paymentsService.getDeleted(pageNum, limitNum, user?.role);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Get('stats')
  @ApiOperation({ summary: 'Get payment statistics (Admin only)' })
  @ApiResponse({ status: 200, type: PaymentStatsDto })
  getStats(@Request() req: any) {
    const { user } = req;
    return this.paymentsService.getStats(user?.role);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Get('status/:status')
  @ApiOperation({ summary: 'Get payments by status (Admin only)' })
  @ApiParam({ name: 'status', enum: PaymentStatus })
  @ApiResponse({ status: 200, type: [PaymentResponseDto] })
  findByStatus(@Param('status') status: PaymentStatus, @Request() req: any) {
    const { user } = req;
    return this.paymentsService.findByStatus(status, user?.role);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Get('type/:payableType')
  @ApiOperation({ summary: 'Get payments by payable type (Admin only)' })
  @ApiParam({ name: 'payableType', enum: PayableType })
  @ApiResponse({ status: 200, type: [PaymentResponseDto] })
  findByPayableType(@Param('payableType') payableType: PayableType, @Request() req: any) {
    const { user } = req;
    return this.paymentsService.findByPayableType(payableType, user?.role);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'USER')
  @Get('user/:userId')
  @ApiOperation({ summary: 'Get payments by user ID' })
  @ApiParam({ name: 'userId', example: 1 })
  @ApiResponse({ status: 200, type: [PaymentResponseDto] })
  findByUser(@Param('userId', ParseIntPipe) userId: number, @Request() req: any) {
    const { user } = req;
    return this.paymentsService.findByUser(userId, user?.sub, user?.role);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'USER')
  @Get('user/:userId/stats')
  @ApiOperation({ summary: 'Get user payment statistics' })
  @ApiParam({ name: 'userId', example: 1 })
  @ApiResponse({ status: 200, type: PaymentStatsDto })
  getUserStats(@Param('userId', ParseIntPipe) userId: number, @Request() req: any) {
    const { user } = req;
    return this.paymentsService.getUserPaymentStats(userId, user?.sub, user?.role);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'USER')
  @Get(':id')
  @ApiOperation({ summary: 'Get a payment by ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, type: PaymentResponseDto })
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    const { user } = req;
    return this.paymentsService.findOne(id, user?.sub, user?.role);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'USER')
  @Patch(':id')
  @ApiOperation({ summary: 'Update a payment' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, type: PaymentResponseDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePaymentDto,
    @Request() req: any,
  ) {
    const { user } = req;
    return this.paymentsService.update(id, dto, user?.sub, user?.role);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'USER')
  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a payment' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 204, description: 'Payment soft deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    const { user } = req;
    return this.paymentsService.remove(id, user?.sub, user?.role);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Delete(':id/force')
  @ApiOperation({ summary: 'Permanently delete a payment (Admin only)' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 204, description: 'Payment permanently deleted' })
  forceDelete(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    const { user } = req;
    return this.paymentsService.forceDelete(id, user?.role);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/restore')
  @ApiOperation({ summary: 'Restore a soft deleted payment (Admin only)' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, type: PaymentResponseDto })
  restore(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    const { user } = req;
    return this.paymentsService.restore(id, user?.role);
  }
}