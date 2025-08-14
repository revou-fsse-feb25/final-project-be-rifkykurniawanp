import { Test, TestingModule } from '@nestjs/testing';
import { ProductOrderItemsService } from './product-order-items.service';

describe('ProductOrderItemsService', () => {
  let service: ProductOrderItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductOrderItemsService],
    }).compile();

    service = module.get<ProductOrderItemsService>(ProductOrderItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
