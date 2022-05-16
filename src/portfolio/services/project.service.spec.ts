import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SkillService } from '../services/skill.service';
import { Skill } from '../entities/skill.entity';

const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
});

describe('Skill Repository Service', () => {
  let service: SkillService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [SkillService,  {
        provide: getRepositoryToken(Skill),
        useValue: mockRepository,
      },],
    }).compile();

  });

  describe('Skill creation', () => {
    it('should create a new skill', () => {
        
    });
  });
});
