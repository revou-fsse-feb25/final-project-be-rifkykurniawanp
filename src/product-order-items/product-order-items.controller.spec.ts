import { Test, TestingModule } from '@nestjs/testing';
import { ProductOrderItemsController } from './product-order-items.controller';
import { ProductOrderItemsService } from './product-order-items.service';

describe('ProductOrderItemsController', () => {
  let controller: ProductOrderItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductOrderItemsController],
      providers: [ProductOrderItemsService],
    }).compile();

    controller = module.get<ProductOrderItemsController>(ProductOrderItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
