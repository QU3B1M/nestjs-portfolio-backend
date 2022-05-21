import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProjectService } from '../services';
import { Project } from '../entities';

const mockRepository = jest.fn(() => ({
  save: async () => {},
  find: async () => {},
  findOne: async () => {},
  delete: async () => {},
  update: async () => {},
  create: async () => {},
  dispose: async () => {},
}))();

describe('Project Repository Service', () => {
  let priject: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        ProjectService,
        {
          provide: getRepositoryToken(Project),
          useValue: mockRepository,
        },
      ],
    }).compile();
    priject = module.get<ProjectService>(ProjectService);
  });

  it('should create a new priject', async () => {
    await priject.create({
      title: 'Project 1',
      description: 'Some description',
    });
  });

  it('should create a new priject without description', async () => {
    await priject.create({ title: 'Project 1' });
  });

  it('should update an priject', async () => {
    await priject.update(1, {
      title: 'Project 1 updated',
      description: 'Some description updated',
    });
  });

  it('should delete an priject', async () => {
    await priject.delete(1);
  });

  it('should get all skills', async () => {
    await priject.getAll();
  });

  it('should get one priject by id', async () => {
    await priject.getById(1);
  });

  it('should get one priject by title', async () => {
    await priject.getByTitle('Project 1');
  });
});

