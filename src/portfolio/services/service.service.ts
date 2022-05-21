import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ServiceDto } from '../dtos';
import { Service } from '../entities';

@Injectable()
export class ServiceService {
  
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async getAll(): Promise<Service[]> {
    return this.serviceRepository.find();
  }

  async getById(id: number): Promise<Service> {
    return this.serviceRepository.findOne(id);
  }

  async getByTitle(title: string): Promise<Service> {
    return this.serviceRepository.findOne({ title });
  }

  async create(params: ServiceDto): Promise<Service> {
    const newSkill = new Service();
    newSkill.title = params.title;
    newSkill.description = params.description;

    return this.serviceRepository.save(newSkill);
  }

  async update(id: number, params: ServiceDto): Promise<Service | undefined> {
    const skill = await this.serviceRepository.findOne(id);
    if (!skill) {
      return undefined;
    }
    skill.title = params.title;
    skill.description = params.description;

    return this.serviceRepository.save(skill);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.serviceRepository.delete(id);
  }
}
