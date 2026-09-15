import { submissionRepository } from "../repositories/submission.repository";
import { SubmissionInput } from "../lib/validations/submission.validation";

export class SubmissionService {
  async submitTool(userId: string, input: SubmissionInput) {
    return submissionRepository.create(userId, input);
  }

  async getUserSubmissions(userId: string) {
    return submissionRepository.findByUser(userId);
  }
}

export const submissionService = new SubmissionService();
