import { ApiClient } from "./apiClient";
const searchService = {
  async executeHybridSearch(params) {
    return ApiClient.post("/search", params);
  }
};
export {
  searchService
};
