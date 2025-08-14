import { PartialType } from '@nestjs/swagger';
import { CreateProductOrderItemDto } from './create-order-item.dto';

export class UpdateProductOrderItemDto extends PartialType(CreateProductOrderItemDto) {}
