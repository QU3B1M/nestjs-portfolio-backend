import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ServiceDto } from '../dtos';
import { Service } from '../entities';

@Injectable()
export class ServiceService {
  
  constructor(
    @InjectRepository(Service)
    private skillRepository: Repository<Service>,
  ) {}

  async getAll(): Promise<Service[]> {
    return this.skillRepository.find();
  }

  async getById(id: number): Promise<Service> {
    return this.skillRepository.findOne(id);
  }

  async getByTitle(title: string): Promise<Service> {
    return this.skillRepository.findOne({ title });
  }

  async create(params: ServiceDto): Promise<Service> {
    const newSkill = new Service();
    newSkill.title = params.title;
    newSkill.description = params.description;

    return this.skillRepository.save(newSkill);
  }

  async update(id: number, params: ServiceDto): Promise<Service | undefined> {
    const skill = await this.skillRepository.findOne(id);
    if (!skill) {
      return undefined;
    }
    skill.title = params.title;
    skill.description = params.description;

    return this.skillRepository.save(skill);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.skillRepository.delete(id);
  }
}
