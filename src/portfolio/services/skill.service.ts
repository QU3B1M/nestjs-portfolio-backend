import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { SkillDto } from '../dtos/skill.dto';
import { Skill } from '../entities/skill.entity';

@Injectable()
export class SkillService {
  
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}

  async getAll(): Promise<Skill[]> {
    return this.skillRepository.find();
  }

  async getById(id: number): Promise<Skill> {
    return this.skillRepository.findOne(id);
  }

  async getByName(name: string): Promise<Skill> {
    return this.skillRepository.findOne({ name });
  }

  async create(params: SkillDto): Promise<Skill> {
    const newSkill = new Skill();
    newSkill.name = params.name;
    newSkill.level = params.level;

    return this.skillRepository.save(newSkill);
  }

  async update(id: number, params: SkillDto): Promise<Skill | undefined> {
    const skill = await this.skillRepository.findOne(id);
    if (!skill) {
      return undefined;
    }
    skill.name = params.name;
    skill.level = params.level;

    return this.skillRepository.save(skill);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.skillRepository.delete(id);
  }
}
