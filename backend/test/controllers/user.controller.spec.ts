import { Test, TestingModule } from '@nestjs/testing';
import controllers from '../../src/controllers';
import services from '../../src/services';
import { UsersController } from '../../src/controllers/users.controller';

describe('userController', () => {
  let userController: UsersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: controllers,
      providers: services,
    }).compile();

    userController = app.get<UsersController>(UsersController);
  });

  describe('users', () => {
    it('should fetch users"', async () => {
      const users = await userController.fetchUsers();
      expect(users).toBeTruthy();
      expect(users.length).toBeGreaterThan(0);
      expect(users[0].id).toBeTruthy();
      expect(users[0].login).toBeTruthy();
    });

    it('should fetch user detail"', async () => {
      const user = await userController.fetchUserDetail(
        'lucasgmagalhaes',
        null,
      );
      console.log(JSON.stringify(user));
      expect(user).toBeTruthy();
    });
  });
});
