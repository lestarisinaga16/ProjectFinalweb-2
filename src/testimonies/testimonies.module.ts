import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Testimonies } from './testimonies.entity';
import { TestimoniesController } from './testimonies.controller';
import { TestimoniesService } from './testimonies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Testimonies])],
  controllers: [TestimoniesController],
  providers: [TestimoniesService],
})
export class TestimoniesModule {} 