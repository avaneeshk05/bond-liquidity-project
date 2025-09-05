export interface Bond {
  cusip: string;
  issuer: string;
  coupon: number;
  maturityDate: string;
  price: number;
  yield: number;
  rating: string;
  type: 'Corporate' | 'Municipal' | 'Treasury';
  quantity?: number; // For portfolio
  priceHistory: { date: string; price: number }[];
}