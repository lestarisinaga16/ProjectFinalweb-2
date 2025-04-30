import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pengiriman } from './pengiriman.entity';
import { CreatePengirimanDTO } from './create-pengiriman.dto.js';

@Injectable()
export class PengirimanService {
  constructor(
    @InjectRepository(Pengiriman)
    private pengirimanRepository: Repository<Pengiriman>,
  ) {}

  async create(createPengirimanDTO: CreatePengirimanDTO): Promise<Pengiriman> {
    // Calculate total if not provided
    if (!createPengirimanDTO.total) {
      createPengirimanDTO.total = createPengirimanDTO.pesanan.reduce(
        (sum, item) => sum + item.harga * item.jumlah,
        0
      );
    }
    
    // Set initial status if not provided
    if (!createPengirimanDTO.status) {
      createPengirimanDTO.status = 'Dipesan';
    }

    const pengiriman = this.pengirimanRepository.create(createPengirimanDTO);
    return await this.pengirimanRepository.save(pengiriman);
  }

  async findAll(): Promise<Pengiriman[]> {
    return await this.pengirimanRepository.find({
      order: {
        id_pesanan: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<Pengiriman> {
    const pengiriman = await this.pengirimanRepository.findOne({ 
      where: { id_pesanan: id } 
    });
    if (!pengiriman) {
      throw new NotFoundException(`Pesanan dengan ID ${id} tidak ditemukan`);
    }
    return pengiriman;
  }

  async update(id: string, updateData: Partial<CreatePengirimanDTO>): Promise<Pengiriman> {
    const pengiriman = await this.findOne(id);
    
    // Recalculate total if order items changed
    if (updateData.pesanan) {
      updateData.total = updateData.pesanan.reduce(
        (sum, item) => sum + item.harga * item.jumlah,
        0
      );
    }

    Object.assign(pengiriman, updateData);
    return await this.pengirimanRepository.save(pengiriman);
  }

  async updateStatus(id: string, status: string): Promise<Pengiriman> {
    const pengiriman = await this.findOne(id);
    pengiriman.status = status;
    return await this.pengirimanRepository.save(pengiriman);
  }

  async remove(id: string): Promise<void> {
    const pengiriman = await this.findOne(id);
    await this.pengirimanRepository.remove(pengiriman);
  }
}