import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ServiceService } from '../services/service.service';
import { Service } from '../entities';

const mockRepository = jest.fn(() => ({
  save: async () => {},
  find: async () => {},
  findOne: async () => {},
  delete: async () => {},
  update: async () => {},
  create: async () => {},
  dispose: async () => {},
}))();

describe('Service Repository Service', () => {
  let service: ServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        ServiceService,
        {
          provide: getRepositoryToken(Service),
          useValue: mockRepository,
        },
      ],
    }).compile();
    service = module.get<ServiceService>(ServiceService);
  });

  it('should create a new service', async () => {
    await service.create({
      title: 'Service 1',
      description: 'Some description',
    });
  });

  it('should create a new service without description', async () => {
    await service.create({ title: 'Service 1' });
  });

  it('should update an service', async () => {
    await service.update(1, {
      title: 'Service 1 updated',
      description: 'Some description updated',
    });
  });

  it('should delete an service', async () => {
    await service.delete(1);
  });

  it('should get all skills', async () => {
    await service.getAll();
  });

  it('should get one service by id', async () => {
    await service.getById(1);
  });

  it('should get one service by title', async () => {
    await service.getByTitle('Service 1');
  });
});
