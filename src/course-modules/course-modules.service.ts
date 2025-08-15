import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CourseModulesRepository } from './course-modules.repository';
import { CreateModuleDto } from './dto/request/create-module.dto';
import { UpdateModuleDto } from './dto/request/update-module.dto';

@Injectable()
export class CourseModulesService {
  constructor(
    private readonly courseModulesRepository: CourseModulesRepository,
  ) {}

  async create(createModuleDto: CreateModuleDto) {
    try {
      return await this.courseModulesRepository.create(createModuleDto);
    } catch (error) {
      if (error.code === 'P2003') {
        throw new BadRequestException('Course not found');
      }
      throw error;
    }
  }

  async findAll() {
    return await this.courseModulesRepository.findAll();
  }

  async findOne(id: number) {
    const module = await this.courseModulesRepository.findById(id);
    
    if (!module) {
      throw new NotFoundException(`Course module with ID ${id} not found`);
    }
    
    return module;
  }

  async findByCourse(courseId: number) {
    return await this.courseModulesRepository.findByCourseId(courseId);
  }

  async update(id: number, updateModuleDto: UpdateModuleDto) {
    const existingModule = await this.courseModulesRepository.findById(id);
    
    if (!existingModule) {
      throw new NotFoundException(`Course module with ID ${id} not found`);
    }

    try {
      return await this.courseModulesRepository.update(id, updateModuleDto);
    } catch (error) {
      if (error.code === 'P2003') {
        throw new BadRequestException('Course not found');
      }
      throw error;
    }
  }

  async remove(id: number) {
    const existingModule = await this.courseModulesRepository.findById(id);
    
    if (!existingModule) {
      throw new NotFoundException(`Course module with ID ${id} not found`);
    }

    await this.courseModulesRepository.delete(id);
    
    return { message: 'Course module deleted successfully' };
  }
}