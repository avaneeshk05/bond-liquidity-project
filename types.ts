export interface Bond {
  cusip: string;
  issuer: string;
  coupon: number;
  maturityDate: string;
  price: number;
  yield: number;
  rating: string;
  type: string;
  fractional: boolean;
  priceHistory: { date: string; price: number }[];
}

export interface PortfolioBond extends Bond {
  quantity: number;
}