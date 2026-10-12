import { ApiClient } from "./apiClient";
const authService = {
  async login(email, password) {
    return ApiClient.post("/auth/login", { email, password });
  },
  async signup(name, email, password, workspaceName) {
    return ApiClient.post("/auth/signup", { name, email, password, workspaceName });
  },
  async getMe() {
    return ApiClient.get("/auth/me");
  }
};
export {
  authService
};
