import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/request/create-payment.dto';
import { UpdatePaymentDto } from './dto/request/update-payment.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentResponseDto } from './dto/response/payment.response.dto';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a payment' })
  @ApiResponse({ status: 201, type: PaymentResponseDto })
  create(@Body() dto: CreatePaymentDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all payments' })
  @ApiResponse({ status: 200, type: [PaymentResponseDto] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payment by id' })
  @ApiResponse({ status: 200, type: PaymentResponseDto })
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a payment' })
  @ApiResponse({ status: 200, type: PaymentResponseDto })
  update(@Param('id') id: number, @Body() dto: UpdatePaymentDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a payment' })
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
