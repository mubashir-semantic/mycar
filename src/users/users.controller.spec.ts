import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const fakeUsersService = {
      findOne: () => Promise.resolve(null),
      find: () => Promise.resolve([]),
    };

    const fakeAuthService = {
      signin: () => Promise.resolve({}),
      signup: () => Promise.resolve({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: AuthService, useValue: fakeAuthService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
