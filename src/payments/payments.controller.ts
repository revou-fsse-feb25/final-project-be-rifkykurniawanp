import { Controller, Get, Post, Put, Param, Body, UseGuards } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { JwtGuard } from "../auth/guards/jwt-auth.guard";
import { CreatePaymentDto } from "./dto/request/create-payment.dto";
import { UpdatePaymentStatusDto } from "./dto/request/update-payment-status.dto.ts";
import { CancelPaymentDto } from "./dto/request/cancel-payment.dto";
import { PaymentResponseDto } from "./dto/response/payment.response.dto";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger";

@ApiTags("payments") // ✅ group di Swagger UI
@ApiBearerAuth() // ✅ karena pakai JWT guard
@Controller("payments")
@UseGuards(JwtGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  @ApiOperation({ summary: "Get all payments" })
  @ApiResponse({ status: 200, type: [PaymentResponseDto] })
  async getAll(): Promise<PaymentResponseDto[]> {
    return this.paymentsService.getAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get payment by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, type: PaymentResponseDto })
  async getById(@Param("id") id: string): Promise<PaymentResponseDto> {
    return this.paymentsService.getById(+id);
  }

  @Get("user/:userId")
  @ApiOperation({ summary: "Get payments by user" })
  @ApiParam({ name: "userId", type: Number })
  @ApiResponse({ status: 200, type: [PaymentResponseDto] })
  async getByUser(@Param("userId") userId: string): Promise<PaymentResponseDto[]> {
    return this.paymentsService.getByUser(+userId);
  }

  @Post()
  @ApiOperation({ summary: "Create a new payment" })
  @ApiBody({ type: CreatePaymentDto })
  @ApiResponse({ status: 201, type: PaymentResponseDto })
  async create(@Body() dto: CreatePaymentDto): Promise<PaymentResponseDto> {
    return this.paymentsService.createPayment(dto);
  }

  @Put(":id/status")
  @ApiOperation({ summary: "Update payment status" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdatePaymentStatusDto })
  @ApiResponse({ status: 200, type: PaymentResponseDto })
  async updateStatus(
    @Param("id") id: string,
    @Body() dto: UpdatePaymentStatusDto
  ): Promise<PaymentResponseDto> {
    return this.paymentsService.updateStatus(+id, dto.status);
  }

  @Post(":id/verify")
  @ApiOperation({ summary: "Verify a payment" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, type: PaymentResponseDto })
  async verify(@Param("id") id: string): Promise<PaymentResponseDto> {
    return this.paymentsService.verify(+id);
  }

  @Post(":id/cancel")
  @ApiOperation({ summary: "Cancel a payment" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: CancelPaymentDto })
  @ApiResponse({ status: 200, type: PaymentResponseDto })
  async cancel(
    @Param("id") id: string,
    @Body() dto: CancelPaymentDto
  ): Promise<PaymentResponseDto> {
    return this.paymentsService.cancel(+id);
  }
}
