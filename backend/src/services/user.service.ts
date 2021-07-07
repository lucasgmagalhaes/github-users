import { Injectable } from "@nestjs/common";
import { GitHubService } from "./octokit.service";
import { UserDetailDto, UserRepositoryDto, UserResumeDto } from "../models";
@Injectable()
export class UserService {
  constructor(private readonly githubService: GitHubService) {}

  async fetchUsers(since?: number) {
    const response = await this.githubService.kit.request("GET /users", {
      since,
      headers: this.githubService.defaultHeaders,
    });
    if (response.data) {
      return response.data.map<UserResumeDto>((user) => ({
        id: user.id,
        login: user.login,
      }));
    }

    return [];
  }

  async fetchUser(username: string) {
    const response = await this.githubService.kit.request(
      "GET /users/{username}",
      {
        username,
        headers: this.githubService.defaultHeaders,
      }
    );
    return response.data as UserDetailDto;
  }

  async fetchUserRepositories(username: string) {
    const response = await this.githubService.kit.request(
      "GET /users/{username}/repos",
      {
        username,
        headers: this.githubService.defaultHeaders,
      }
    );
    return response.data as UserRepositoryDto[];
  }
}
