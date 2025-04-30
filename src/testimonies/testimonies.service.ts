import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Testimonies } from './testimonies.entity';
import { CreateTestimonyDTO } from './create-testimony.dto';

@Injectable()
export class TestimoniesService {
  constructor(
    @InjectRepository(Testimonies)
    private testimoniesRepository: Repository<Testimonies>,
  ) {}

  async create(createTestimonyDTO: CreateTestimonyDTO): Promise<Testimonies> {
    const testimony = this.testimoniesRepository.create({
      ...createTestimonyDTO,
      tanggal_review: new Date(),
    });
    return await this.testimoniesRepository.save(testimony);
  }

  async findAll(): Promise<Testimonies[]> {
    return await this.testimoniesRepository.find({
      order: {
        tanggal_review: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Testimonies> {
    const testimony = await this.testimoniesRepository.findOne({ where: { id } });
    if (!testimony) {
      throw new NotFoundException(`Testimony with ID ${id} not found`);
    }
    return testimony;
  }

  async update(id: number, updateData: Partial<CreateTestimonyDTO>): Promise<Testimonies> {
    const testimony = await this.findOne(id);
    Object.assign(testimony, updateData);
    return await this.testimoniesRepository.save(testimony);
  }

  async remove(id: number): Promise<void> {
    const testimony = await this.findOne(id);
    await this.testimoniesRepository.remove(testimony);
  }
}
