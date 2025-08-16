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
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/request/create-product.dto';
import { UpdateProductDto } from './dto/request/update-product.dto';
import { ProductResponseDto } from './dto/response/product.response.dto';
import { ProductCategory, ProductOrigin, ProductStatus, ProductTagName } from '@prisma/client';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guards/role.guard';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiCreatedResponse({ description: 'The product has been successfully created.', type: ProductResponseDto })
  @ApiBadRequestResponse({ description: 'Product slug already exists' })
  @ApiBody({ type: CreateProductDto })
  create(@Body() createProductDto: CreateProductDto): Promise<ProductResponseDto> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products with optional filters' })
  @ApiOkResponse({ description: 'A list of products', type: [ProductResponseDto] })
  @ApiQuery({ name: 'page', required: false, description: 'Page number for pagination', type: 'number', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of items per page', type: 'number', example: 10 })
  @ApiQuery({ name: 'category', required: false, enum: ProductCategory, description: 'Filter by product category' })
  @ApiQuery({ name: 'origin', required: false, enum: ProductOrigin, description: 'Filter by product origin' })
  @ApiQuery({ name: 'status', required: false, enum: ProductStatus, description: 'Filter by product status' })
  @ApiQuery({ name: 'supplierId', required: false, description: 'Filter by supplier ID', type: 'number' })
  @ApiQuery({ name: 'minPrice', required: false, description: 'Filter by minimum price', type: 'number' })
  @ApiQuery({ name: 'maxPrice', required: false, description: 'Filter by maximum price', type: 'number' })
  findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('category') category?: ProductCategory,
    @Query('origin') origin?: ProductOrigin,
    @Query('status') status?: ProductStatus,
    @Query('supplierId', ParseIntPipe) supplierId?: number,
    @Query('minPrice', ParseIntPipe) minPrice?: number,
    @Query('maxPrice', ParseIntPipe) maxPrice?: number,
  ): Promise<ProductResponseDto[]> {
    const filter = {
      category,
      origin,
      status,
      supplierId,
      minPrice,
      maxPrice,
    };
    
    return this.productsService.findAll(page, limit, filter);
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

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get a product by its slug' })
  @ApiParam({ name: 'slug', description: 'The unique slug of the product', type: 'string' })
  @ApiOkResponse({ description: 'The product with the given slug', type: ProductResponseDto })
  @ApiNotFoundResponse({ description: 'Product not found' })
  findBySlug(@Param('slug') slug: string): Promise<ProductResponseDto> {
    return this.productsService.findBySlug(slug);
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
  @Roles('ADMIN')
  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id', description: 'The unique ID of the product', type: 'number' })
  @ApiOkResponse({ description: 'The updated product', type: ProductResponseDto })
  @ApiBody({ type: UpdateProductDto })
  @ApiNotFoundResponse({ description: 'Product not found' })
  @ApiBadRequestResponse({ description: 'Invalid input or slug already exists' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    return this.productsService.update(id, updateProductDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ name: 'id', description: 'The unique ID of the product', type: 'number' })
  @ApiOkResponse({ description: 'Product successfully deleted' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productsService.remove(id);
  }
}
