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
import { PengirimanService } from './pengiriman.service';
import { Pengiriman } from './pengiriman.entity';
import { CreatePengirimanDTO } from './create-pengiriman.dto.js';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('pengiriman')
@Controller('pengiriman')
export class PengirimanController {
  constructor(private readonly pengirimanService: PengirimanService) {}

  @Post()
  @ApiOperation({ summary: 'Buat pengiriman baru' })
  @ApiResponse({ status: 201, description: 'Pengiriman berhasil dibuat' })
  async create(@Body() createPengirimanDTO: CreatePengirimanDTO) {
    return await this.pengirimanService.create(createPengirimanDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Ambil semua data pengiriman' })
  @ApiResponse({ status: 200, description: 'Data pengiriman berhasil diambil' })
  async findAll(): Promise<Pengiriman[]> {
    return await this.pengirimanService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ambil detail pengiriman' })
  @ApiResponse({ status: 200, description: 'Detail pengiriman berhasil diambil' })
  @ApiResponse({ status: 404, description: 'Pengiriman tidak ditemukan' })
  async findOne(@Param('id') id: string): Promise<Pengiriman> {
    return await this.pengirimanService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update data pengiriman' })
  @ApiResponse({ status: 200, description: 'Pengiriman berhasil diupdate' })
  async update(
    @Param('id') id: string,
    @Body() updatePengirimanDTO: Partial<CreatePengirimanDTO>,
  ) {
    return await this.pengirimanService.update(id, updatePengirimanDTO);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update status pengiriman' })
  @ApiResponse({ status: 200, description: 'Status pengiriman berhasil diupdate' })
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return await this.pengirimanService.updateStatus(id, status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Hapus pengiriman' })
  @ApiResponse({ status: 200, description: 'Pengiriman berhasil dihapus' })
  async remove(@Param('id') id: string) {
    return await this.pengirimanService.remove(id);
  }
}