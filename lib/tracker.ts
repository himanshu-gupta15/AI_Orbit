export interface TrackActivityOptions {
  toolId?: string;
  metadata?: Record<string, any>;
}

export function trackActivity(
  action: string,
  options: TrackActivityOptions = {}
): void {
  if (typeof window === "undefined") return;

  const payload = {
    action,
    toolId: options.toolId,
    metadata: options.metadata,
  };

  try {
    // Use keepalive fetch to ensure request completes even if user navigates away
    fetch("/api/activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Intentionally silent
    });
  } catch {
    // Intentionally silent
  }
}
