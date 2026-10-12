import { ApiClient } from './apiClient';

export interface FeedbackSubmission {
  messageId?: string;
  query?: string;
  isHelpful: boolean;
  reason?: string;
  comment?: string;
}

export const feedbackService = {
  async submitFeedback(payload: FeedbackSubmission): Promise<{ success: boolean; message: string }> {
    return ApiClient.post<{ success: boolean; message: string }, FeedbackSubmission>(
      '/feedback',
      payload
    );
  },
};
