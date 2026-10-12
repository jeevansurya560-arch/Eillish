import { ApiClient } from "./apiClient";
const settingsService = {
  async getSettings() {
    return ApiClient.get("/settings");
  },
  async updateSettings(updates) {
    return ApiClient.put("/settings", updates);
  },
  async getDatabaseHealth() {
    const BASE_URL = import.meta.env?.VITE_API_BASE_URL || "http://localhost:8000/api/v1";
    const rootUrl = BASE_URL.replace("/api/v1", "");
    const resp = await fetch(`${rootUrl}/health/database`);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    return resp.json();
  }
};
export {
  settingsService
};
