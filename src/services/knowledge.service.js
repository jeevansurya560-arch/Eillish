import { ApiClient } from "./apiClient";
const knowledgeService = {
  async getOverviewStats() {
    return ApiClient.get("/knowledge/stats");
  },
  async getGrowthTimeline() {
    return ApiClient.get("/knowledge/growth");
  },
  async getDocuments(params) {
    const queryParts = [];
    if (params?.repository) queryParts.push(`repository=${encodeURIComponent(params.repository)}`);
    if (params?.type) queryParts.push(`type=${encodeURIComponent(params.type)}`);
    if (params?.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);
    const qs = queryParts.length ? `?${queryParts.join("&")}` : "";
    return ApiClient.get(`/knowledge${qs}`);
  },
  async getDocumentById(id) {
    try {
      return await ApiClient.get(`/knowledge/${id}`);
    } catch {
      return null;
    }
  },
  async getRecentDocuments(limit = 5) {
    const docs = await this.getDocuments();
    return docs.slice(0, limit);
  },
  async getRecentActivity(limit = 6) {
    try {
      const activities = await ApiClient.get("/activity");
      return activities.slice(0, limit);
    } catch {
      return [];
    }
  },
  async getRepositories() {
    return ApiClient.get("/repositories");
  },
  async searchKnowledge(query) {
    return ApiClient.post("/search", { query });
  }
};
export {
  knowledgeService
};
