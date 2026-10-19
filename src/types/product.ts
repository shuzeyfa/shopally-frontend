/**
 * Mirrors pkg/domain/product.go in the backend. Field names match that
 * struct's JSON tags exactly — do not rename without changing the Go side.
 */

/** A product price in both currencies, with the rate's timestamp. */
export interface Price {
  etb: number;
  usd: number;
  /** RFC 3339 timestamp of the FX rate used for this conversion. */
  fxTimestamp: string;
}

export interface Product {
  id: string;
  title: string;
  imageUrl: string;
  /** How well this product matches the query, 0-100. */
  aiMatchPercentage: number;
  price: Price;
  /** Star rating, 0-5. */
  productRating: number;
  /** Seller reputation, 0-100. */
  sellerScore: number;
  /** Human-readable delivery window, e.g. "15-30 days". */
  deliveryEstimate: string;
  summaryBullets: string[];
  /** Outbound affiliate link to the product page. */
  deeplinkUrl: string;
}

/** Payload of GET /api/v1/search. */
export interface SearchResult {
  products: Product[];
  total?: number;
}

/** A single attribute comparison row across multiple products. */
export interface AttributeComparison {
  key: string;
  label: string;
  values: Record<string, string>;
}

/** Payload of POST /api/v1/compare. */
export interface CompareResult {
  products: Product[];
  attributes: AttributeComparison[];
}
