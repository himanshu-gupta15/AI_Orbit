import { submissionRepository } from "../repositories/submission.repository";
import { SubmissionInput } from "../lib/validations/submission.validation";

import { activityService } from "./activity.service";

export class SubmissionService {
  async submitTool(userId: string, input: SubmissionInput) {
    const submission = await submissionRepository.create(userId, input);

    activityService.logActivity({
      userId,
      action: "SUBMIT_TOOL",
      metadata: {
        toolName: input.name,
        websiteUrl: input.websiteUrl,
        category: input.category,
        pricing: input.pricing,
      },
    });

    return submission;
  }

  async getUserSubmissions(userId: string) {
    return submissionRepository.findByUser(userId);
  }
}

export const submissionService = new SubmissionService();
