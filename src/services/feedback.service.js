import { ApiClient } from "./apiClient";
const feedbackService = {
  async submitFeedback(payload) {
    return ApiClient.post(
      "/feedback",
      payload
    );
  }
};
export {
  feedbackService
};
