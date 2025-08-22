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
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Request } from 'express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/request/create-product.dto';
import { UpdateProductDto } from './dto/request/update-product.dto';
import { ProductResponseDto } from './dto/response/product.response.dto';
import { ProductCategory, ProductOrigin, ProductStatus, ProductTagName } from '@prisma/client';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guards/role.guard';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    role: string;
    email: string;
  };
}

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'SUPPLIER')
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiCreatedResponse({ 
    description: 'The product has been successfully created.', 
    type: ProductResponseDto 
  })
  @ApiBadRequestResponse({ description: 'Product slug already exists' })
  @ApiBody({ type: CreateProductDto })
  create(
    @Body() createProductDto: CreateProductDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ProductResponseDto> {
    return this.productsService.create(
      createProductDto,
      req.user.id,
      req.user.role as any,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all products with optional filters' })
  @ApiOkResponse({ description: 'A list of products', type: [ProductResponseDto] })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('category') category?: ProductCategory,
    @Query('origin') origin?: ProductOrigin,
    @Query('status') status?: ProductStatus,
    @Query('supplierId') supplierId?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('tags') tags?: string,
    @Query('search') search?: string,
  ): Promise<ProductResponseDto[]> {
    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 10;
    
    const filter = {
      category,
      origin,
      status,
      supplierId: supplierId ? parseInt(supplierId) : undefined,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
    };

    return this.productsService.findAll(pageNum, limitNum, filter);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get a product by its slug' })
  @ApiParam({ name: 'slug', description: 'The unique slug of the product', type: 'string' })
  @ApiOkResponse({ description: 'The product with the given slug', type: ProductResponseDto })
  @ApiNotFoundResponse({ description: 'Product not found' })
  findBySlug(@Param('slug') slug: string): Promise<ProductResponseDto> {
    return this.productsService.findBySlug(slug);
  }

  @Get('supplier/:supplierId')
  @ApiOperation({ summary: 'Get all products by a supplier ID' })
  @ApiParam({ name: 'supplierId', description: 'The unique ID of the supplier', type: 'number' })
  @ApiOkResponse({ description: 'A list of products by the specified supplier', type: [ProductResponseDto] })
  findBySupplierId(
    @Param('supplierId', ParseIntPipe) supplierId: number,
  ): Promise<ProductResponseDto[]> {
    return this.productsService.findBySupplierId(supplierId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single product by ID' })
  @ApiParam({ name: 'id', description: 'The unique ID of the product', type: 'number' })
  @ApiOkResponse({ description: 'The product with the given ID', type: ProductResponseDto })
  @ApiNotFoundResponse({ description: 'Product not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductResponseDto> {
    return this.productsService.findOne(id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'SUPPLIER')
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id', description: 'The unique ID of the product', type: 'number' })
  @ApiOkResponse({ description: 'The updated product', type: ProductResponseDto })
  @ApiBody({ type: UpdateProductDto })
  @ApiNotFoundResponse({ description: 'Product not found' })
  @ApiBadRequestResponse({ description: 'Invalid input or slug already exists' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ProductResponseDto> {
    return this.productsService.update(
      id,
      updateProductDto,
      req.user.id,
      req.user.role as any,
    );
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'SUPPLIER')
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft delete a product by ID' })
  @ApiParam({ name: 'id', description: 'The unique ID of the product', type: 'number' })
  @ApiOkResponse({ description: 'Product successfully deleted (soft delete)' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<void> {
    return this.productsService.remove(id, req.user.id, req.user.role as any);
  }

  // NEW SOFT DELETE ENDPOINTS
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id/force')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Permanently delete a product by ID (Admin only)' })
  @ApiParam({ name: 'id', description: 'The unique ID of the product', type: 'number' })
  @ApiOkResponse({ description: 'Product permanently deleted' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  forceDelete(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<void> {
    return this.productsService.forceDelete(id, req.user.role as any);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/restore')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Restore a soft deleted product (Admin only)' })
  @ApiParam({ name: 'id', description: 'The unique ID of the product', type: 'number' })
  @ApiOkResponse({ description: 'Product successfully restored', type: ProductResponseDto })
  @ApiNotFoundResponse({ description: 'Deleted product not found' })
  restore(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<ProductResponseDto> {
    return this.productsService.restore(id, req.user.role as any);
  }
}
