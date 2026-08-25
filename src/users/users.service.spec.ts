import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    // Fake repository banayi jo TypeORM ke database operations ko mock karegi
    const fakeRepository = {
      find: () => Promise.resolve([]),
      findOne: () => Promise.resolve(null),
      create: (dto: any) => dto as User,
      save: (user: any) => Promise.resolve({ id: 1, ...user }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: fakeRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('can be defined', () => {
    expect(service).toBeDefined();
  });
});
