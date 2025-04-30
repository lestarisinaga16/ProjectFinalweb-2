import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pesan } from './pesan.entity';
import { CreatePesanDTO } from './create-pesan.dto';

@Injectable()
export class PesanService {
  constructor(
    @InjectRepository(Pesan)
    private pesanRepository: Repository<Pesan>,
  ) {}

  async create(createPesanDTO: CreatePesanDTO): Promise<Pesan> {
    const pesan = this.pesanRepository.create(createPesanDTO);
    return await this.pesanRepository.save(pesan);
  }

  async findAll(): Promise<Pesan[]> {
    return await this.pesanRepository.find();
  }

  async findOne(id: number): Promise<Pesan | null> {
    return await this.pesanRepository.findOne({ where: { id } });
  }

  async update(id: number, updateData: Partial<CreatePesanDTO>): Promise<Pesan> {
    const pesan = await this.findOne(id);
    if (!pesan) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    Object.assign(pesan, updateData);
    return await this.pesanRepository.save(pesan);
  }

  async remove(id: number): Promise<void> {
    const pesan = await this.findOne(id);
    if (!pesan) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    await this.pesanRepository.remove(pesan);
  }
}