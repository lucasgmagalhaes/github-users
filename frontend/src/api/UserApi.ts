import axios from "axios";
import { UserResumeDto } from "../models";

export class UserApi {
  async fetchAll(since?: number) {
    const response = await axios.get<UserResumeDto[]>(
      "http://localhost:3000/api/users",
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
}
