import {
  Controller,
  Get,
  Param,
} from "@nestjs/common";
import { UserService } from "../services/user.service";

@Controller("api/users")
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async fetchUsers(@Param() since?: number) {
    return await this.userService.fetchUsers(since);
  }

  @Get("/:username/detail")
  async fetchUserDetail(@Param("username") username: string) {
    return await this.userService.fetchUser(username);
  }

  @Get("/:username/repos")
  async fetchUserRepos(@Param("username") username: string) {
    return await this.userService.fetchUserRepositories(username);
  }
}
