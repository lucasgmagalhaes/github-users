import axios from "axios";
import { UserDetailDto, UserRepositoryDto, UserResumeDto } from "../models";

export class UserApi {
  constructor() {
    axios.defaults.baseURL = "https://backend-github-users.herokuapp.com/api";
  }

  async fetch(since?: number) {
    const response = await axios.get<UserResumeDto[]>("users");
    return response.data;
  }

  async fetchDetail(userName: string) {
    const response = await axios.get<UserDetailDto>(`${userName}/detail`);
    return response.data;
  }

  async fetchRepositories(userName: string) {
    const response = await axios.get<UserRepositoryDto[]>(`${userName}/repos`);
    return response.data;
  }
}
