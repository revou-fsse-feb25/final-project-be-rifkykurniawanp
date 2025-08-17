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
  @ApiQuery({ 
    name: 'page', 
    required: false, 
    description: 'Page number for pagination', 
    type: 'number', 
    example: 1 
  })
  @ApiQuery({ 
    name: 'limit', 
    required: false, 
    description: 'Number of items per page', 
    type: 'number', 
    example: 10 
  })
  @ApiQuery({ 
    name: 'category', 
    required: false, 
    enum: ProductCategory, 
    description: 'Filter by product category' 
  })
  @ApiQuery({ 
    name: 'origin', 
    required: false, 
    enum: ProductOrigin, 
    description: 'Filter by product origin' 
  })
  @ApiQuery({ 
    name: 'status', 
    required: false, 
    enum: ProductStatus, 
    description: 'Filter by product status' 
  })
  @ApiQuery({ 
    name: 'supplierId', 
    required: false, 
    description: 'Filter by supplier ID', 
    type: 'number' 
  })
  @ApiQuery({ 
    name: 'minPrice', 
    required: false, 
    description: 'Filter by minimum price', 
    type: 'number' 
  })
  @ApiQuery({ 
    name: 'maxPrice', 
    required: false, 
    description: 'Filter by maximum price', 
    type: 'number' 
  })
  @ApiQuery({ 
    name: 'tags', 
    required: false, 
    description: 'Filter by product tags (comma-separated)', 
    type: 'string',
    example: 'ARABICA,ROBUSTA'
  })
  @ApiQuery({ 
    name: 'search', 
    required: false, 
    description: 'Search by product name or description', 
    type: 'string' 
  })
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

  @Get('search')
  @ApiOperation({ summary: 'Search products by name or description' })
  @ApiQuery({ 
    name: 'q', 
    required: true, 
    description: 'Search query', 
    type: 'string' 
  })
  @ApiQuery({ 
    name: 'page', 
    required: false, 
    description: 'Page number for pagination', 
    type: 'number', 
    example: 1 
  })
  @ApiQuery({ 
    name: 'limit', 
    required: false, 
    description: 'Number of items per page', 
    type: 'number', 
    example: 10 
  })
  @ApiOkResponse({ description: 'Search results', type: [ProductResponseDto] })
  search(
    @Query('q') query: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<ProductResponseDto[]> {
    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 10;
    
    // For now, return empty array until search is implemented in service
    // You'll need to implement search functionality in the service layer
    return this.productsService.findAll(pageNum, limitNum, {});
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Get products by category' })
  @ApiParam({ 
    name: 'category', 
    enum: ProductCategory,
    description: 'Product category' 
  })
  @ApiOkResponse({ description: 'Products in the specified category', type: [ProductResponseDto] })
  findByCategory(
    @Param('category') category: ProductCategory,
  ): Promise<ProductResponseDto[]> {
    return this.productsService.findAll(1, 100, { category });
  }

  @Get('origin/:origin')
  @ApiOperation({ summary: 'Get products by origin' })
  @ApiParam({ 
    name: 'origin', 
    enum: ProductOrigin,
    description: 'Product origin' 
  })
  @ApiOkResponse({ description: 'Products from the specified origin', type: [ProductResponseDto] })
  findByOrigin(
    @Param('origin') origin: ProductOrigin,
  ): Promise<ProductResponseDto[]> {
    return this.productsService.findAll(1, 100, { origin });
  }

  @Get('supplier/:supplierId')
  @ApiOperation({ summary: 'Get all products by a supplier ID' })
  @ApiParam({ 
    name: 'supplierId', 
    description: 'The unique ID of the supplier', 
    type: 'number' 
  })
  @ApiOkResponse({ 
    description: 'A list of products by the specified supplier', 
    type: [ProductResponseDto] 
  })
  findBySupplierId(
    @Param('supplierId', ParseIntPipe) supplierId: number,
  ): Promise<ProductResponseDto[]> {
    return this.productsService.findBySupplierId(supplierId);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get a product by its slug' })
  @ApiParam({ 
    name: 'slug', 
    description: 'The unique slug of the product', 
    type: 'string' 
  })
  @ApiOkResponse({ description: 'The product with the given slug', type: ProductResponseDto })
  @ApiNotFoundResponse({ description: 'Product not found' })
  findBySlug(@Param('slug') slug: string): Promise<ProductResponseDto> {
    return this.productsService.findBySlug(slug);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single product by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'The unique ID of the product', 
    type: 'number' 
  })
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
  @ApiParam({ 
    name: 'id', 
    description: 'The unique ID of the product', 
    type: 'number' 
  })
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
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'The unique ID of the product', 
    type: 'number' 
  })
  @ApiOkResponse({ description: 'Product successfully deleted' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<void> {
    return this.productsService.remove(id, req.user.id, req.user.role as any);
  }
}