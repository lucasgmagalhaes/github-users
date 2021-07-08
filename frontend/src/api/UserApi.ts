import axios from "axios";
import { UserDetailDto, UserRepositoryDto, UserResumeDto } from "../models";

export class UserApi {
  async fetch(since?: number) {
    const response = await axios.get<UserResumeDto[]>(
      "http://localhost:3100/api/users",
      {
        params: {
          since,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return response.data;
  }

  async fetchDetail(userName: string) {
    const response = await axios.get<UserDetailDto>(
      `http://localhost:3100/api/users/${userName}/detail`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return response.data;
  }

  async fetchRepositories(userName: string) {
    const response = await axios.get<UserRepositoryDto[]>(
      `http://localhost:3100/api/users/${userName}/repos`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return response.data;
  }
}
