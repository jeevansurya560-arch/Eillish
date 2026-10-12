import { ApiClient } from "./apiClient";
const analyticsService = {
  async getMetrics() {
    return ApiClient.get("/analytics/metrics");
  }
};
export {
  analyticsService
};
