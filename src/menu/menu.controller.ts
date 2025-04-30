import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateMenuDTO } from './create-menu.dto';
import { MenuService } from './menu.service';
import { Menu } from './menu.entity';
import { ApiParam, ApiQuery, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Create a new menu item' })
  @ApiResponse({ status: 201, description: 'Menu item created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createMenuDTO: CreateMenuDTO): Promise<Menu> {
    return await this.menuService.create(createMenuDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Get all menu items' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'Menu items retrieved successfully' })
  async findAll(): Promise<Menu[]> {
    return await this.menuService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get menu item by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the menu item' })
  @ApiResponse({ status: 201, description: 'Menu item retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Menu item not found' })
  async findOne(@Param('id') id: string): Promise<Menu> {
    return this.menuService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Update menu item' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the menu item' })
  @ApiResponse({ status: 201, description: 'Menu item updated successfully' })
  @ApiResponse({ status: 401, description: 'Menu item not found' })
  async update(
    @Param('id') id: string,
    @Body() updateMenuDto: Partial<Menu>,
  ): Promise<Menu> {
    return this.menuService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Delete menu item' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the menu item' })
  @ApiResponse({ status: 201, description: 'Menu item deleted successfully' })
  @ApiResponse({ status: 401, description: 'Menu item not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.menuService.remove(+id);
  }
}
