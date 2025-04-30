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
import { TestimoniesService } from './testimonies.service';
import { Testimonies } from './testimonies.entity';
import { CreateTestimonyDTO } from './create-testimony.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('testimonies')
@Controller('testimonies')
export class TestimoniesController {
  constructor(private readonly testimoniesService: TestimoniesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new testimony' })
  @ApiResponse({ status: 201, description: 'Testimony created successfully' })
  async create(@Body() createTestimonyDTO: CreateTestimonyDTO) {
    return await this.testimoniesService.create(createTestimonyDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Get all testimonies' })
  @ApiResponse({ status: 200, description: 'Return all testimonies' })
  async findAll(): Promise<Testimonies[]> {
    return await this.testimoniesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get testimony by ID' })
  @ApiResponse({ status: 200, description: 'Return the testimony' })
  @ApiResponse({ status: 404, description: 'Testimony not found' })
  async findOne(@Param('id') id: number): Promise<Testimonies> {
    return await this.testimoniesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update testimony' })
  @ApiResponse({ status: 200, description: 'Testimony updated successfully' })
  async update(
    @Param('id') id: number,
    @Body() updateTestimonyDTO: Partial<CreateTestimonyDTO>,
  ) {
    return await this.testimoniesService.update(id, updateTestimonyDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete testimony' })
  @ApiResponse({ status: 200, description: 'Testimony deleted successfully' })
  async remove(@Param('id') id: number) {
    return await this.testimoniesService.remove(id);
  }
}
