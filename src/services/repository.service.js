import { ApiClient } from "./apiClient";
const repositoryService = {
  async getRepositories() {
    return ApiClient.get("/repositories");
  },
  async getRepositoryById(id) {
    try {
      return await ApiClient.get(`/repositories/${id}`);
    } catch {
      return null;
    }
  },
  async syncRepository(id) {
    return ApiClient.post(
      `/repositories/${id}/sync`,
      {}
    );
  },
  async connectRepository(name, url) {
    return ApiClient.post("/repositories/connect", { name, url });
  }
};
export {
  repositoryService
};
