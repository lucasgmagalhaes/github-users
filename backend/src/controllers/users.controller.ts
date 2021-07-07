import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async fetchUsers(@Param() since?: number) {
    return await this.userService.fetchUsers(since);
  }

  @Get('/:username/detail')
  async fetchUserDetail(
    @Param('username') username: string,
    @Res() res: Response,
  ) {
    const user = await this.userService.fetchUser(username);
    if (!user) {
      res.status(HttpStatus.NOT_FOUND);
      return;
    }
    return user;
  }

  @Get('/:username/repos')
  async fetchUserRepos(@Param('username') username: string) {
    await this.userService.fetchUserRepositories(username);
  }
}
