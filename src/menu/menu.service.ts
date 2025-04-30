import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    const menu = this.menuRepository.create(createMenuDto);
    return await this.menuRepository.save(menu);
  }

  async findAll(): Promise<Menu[]> {
    return await this.menuRepository.find();
  }

  async findOne(id: number): Promise<Menu> {
    return await this.menuRepository.findOne({ where: { id } });
  }

  async update(id: number, updateMenuDto: Partial<Menu>): Promise<Menu> {
    await this.menuRepository.update(id, updateMenuDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.menuRepository.delete(id);
  }
}
