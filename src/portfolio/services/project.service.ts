import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ProjectDto } from '../dtos';
import { Project } from '../entities';

@Injectable()
export class ProjectService {
  
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async getAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async getById(id: number): Promise<Project> {
    return this.projectRepository.findOne(id);
  }

  async getByTitle(title: string): Promise<Project> {
    return this.projectRepository.findOne({ title });
  }

  async create(params: ProjectDto): Promise<Project> {
    const newSkill = new Project();
    newSkill.title = params.title;
    newSkill.description = params.description;

    return this.projectRepository.save(newSkill);
  }

  async update(id: number, params: ProjectDto): Promise<Project | undefined> {
    const skill = await this.projectRepository.findOne(id);
    if (!skill) {
      return undefined;
    }
    skill.title = params.title;
    skill.description = params.description;

    return this.projectRepository.save(skill);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.projectRepository.delete(id);
  }
}
