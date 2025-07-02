import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.service.interface';
import { CreateProductDto } from './dto/create-product.dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto/update-product.dto';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    { id: 1, name: 'alat kopi', category: 'alat' },
    { id: 2, name: 'alat teh', category: 'alat' },
    { id: 3, name: 'alat herbal', category: 'alat' },
    { id: 4, name: 'bubuk teh', category: 'bahan' },
    { id: 5, name: 'bubuk kopi', category: 'bahan' },
    { id: 6, name: 'daun herbal', category: 'bahan' },
  ];

  private idCounter = 7;

  findAll(): Product[] {
    return this.products;
  }

  findByCategory(category: string): Product[] {
    return this.products.filter((p) => p.category === category);
  }

  create(dto: CreateProductDto): Product {
    const newProduct: Product = {
      id: this.idCounter++,
      ...dto,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, dto: UpdateProductDto): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) throw new NotFoundException('Product not found');
    Object.assign(product, dto);
    return product;
  }

  delete(id: number): void {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException('Product not found');
    this.products.splice(index, 1);
  }
}
