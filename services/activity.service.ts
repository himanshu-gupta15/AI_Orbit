import { activityRepository, ActivityRepository } from "@/repositories/activity.repository";

export interface LogActivityParams {
  userId?: string | null;
  toolId?: string | null;
  action: string;
  metadata?: Record<string, any> | string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export class ActivityService {
  constructor(private activityRepo: ActivityRepository = activityRepository) {}

  async logActivity(params: LogActivityParams) {
    try {
      return await this.activityRepo.create(params);
    } catch (error) {
      // Non-blocking error handling: activity logging should never crash user transactions
      console.error("Failed to log activity:", error);
      return null;
    }
  }

  async getUserActivities(userId: string, limit = 20) {
    const activities = await this.activityRepo.findByUserId(userId, limit);
    return activities.map((act) => ({
      ...act,
      metadata: this.safeJsonParse(act.metadata),
    }));
  }

  async getRecentActivities(limit = 50) {
    const activities = await this.activityRepo.findRecent(limit);
    return activities.map((act) => ({
      ...act,
      metadata: this.safeJsonParse(act.metadata),
    }));
  }

  private safeJsonParse(val: string | null) {
    if (!val) return null;
    try {
      return JSON.parse(val);
    } catch {
      return val;
    }
  }
}

export const activityService = new ActivityService();
