import { UserApi } from "./UserApi";

class Api {
  public readonly users: UserApi;

  constructor() {
    this.users = new UserApi();
  }
}

const api = new Api();
export default api;
