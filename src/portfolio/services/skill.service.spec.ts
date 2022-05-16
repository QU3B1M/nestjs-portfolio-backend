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
    const module: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        SkillService,
        {
          provide: getRepositoryToken(Skill),
          useValue: mockRepository,
        },
      ],
    }).compile();
    service = module.get<SkillService>(SkillService);
  });

  describe('Skill creation', () => {
    it('should create a new skill', async () => {
      await service.create({ name: 'Skill 1', level: 10 });
    });

    it('should update an skill', async () => {
      await service.update({ id: 1 }, { name: 'Skill 1 updated', level: 11 });
    });

    it('should delete an skill', async () => {
      await service.delete(1);
    });

    it('should get all skills', async () => {
      await service.getAll(1);
    });

    it('should get one skill by id', async () => {
      await service.getById(1);
    });

    it('should get one skill by name', async () => {
      await service.getByName('Skill 1');
    });
  });
});
