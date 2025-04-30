import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PesanService } from './pesan.service';
import { Pesan } from './pesan.entity';
import { CreatePesanDTO } from './create-pesan.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('pesan')
@Controller('pesan')
export class PesanController {
  constructor(private readonly pesanService: PesanService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  async create(@Body() createPesanDTO: CreatePesanDTO) {
    return await this.pesanService.create(createPesanDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Return all orders' })
  async findAll(): Promise<Pesan[]> {
    return await this.pesanService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiResponse({ status: 200, description: 'Return the order' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async findOne(@Param('id') id: number): Promise<Pesan> {
    const pesan = await this.pesanService.findOne(id);
    if (!pesan) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return pesan;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update order' })
  @ApiResponse({ status: 200, description: 'Order updated successfully' })
  async update(
    @Param('id') id: number,
    @Body() updatePesanDTO: Partial<CreatePesanDTO>,
  ) {
    return await this.pesanService.update(id, updatePesanDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete order' })
  @ApiResponse({ status: 200, description: 'Order deleted successfully' })
  async remove(@Param('id') id: number) {
    return await this.pesanService.remove(id);
  }
}