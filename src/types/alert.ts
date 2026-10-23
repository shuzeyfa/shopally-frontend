/**
 * Mirrors pkg/domain/alert.go in the backend.
 *
 * Note the create payload carries no `userId`: the backend derives the owner
 * from the authenticated request and ignores any owner sent in the body.
 * Alert endpoints require the API bearer token issued after sign-in.
 */

export interface Alert {
  alertId: string;
  userId: string;
  productId: string;
  targetPrice: number;
  currency: "ETB" | "USD";
  isActive: boolean;
  triggeredAt?: string;
  triggeredPrice?: number;
}

/** Body of POST /api/v1/alerts. */
export interface CreateAlertPayload {
  productId: string;
  targetPrice: number;
  currency: "ETB" | "USD";
}
