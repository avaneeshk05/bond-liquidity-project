import { Bond } from './types';

const mockBonds: Bond[] = [
  {
    cusip: 'IN1234567890',
    issuer: 'Reliance Industries Ltd.',
    coupon: 7.5,
    maturityDate: '2030-12-31',
    price: 102.0,
    yield: 7.2,
    rating: 'AAA',
    type: 'Corporate',
    priceHistory: [
      { date: '2023-01-01', price: 101.0 },
      { date: '2023-02-01', price: 101.5 },
      { date: '2023-03-01', price: 101.8 },
      { date: '2023-04-01', price: 102.0 },
      { date: '2023-05-01', price: 102.0 },
    ],
  },
  {
    cusip: 'IN0987654321',
    issuer: 'HDFC Bank',
    coupon: 6.8,
    maturityDate: '2028-06-30',
    price: 101.5,
    yield: 6.5,
    rating: 'AA+',
    type: 'Corporate',
    priceHistory: [
        { date: '2023-01-01', price: 100.0 },
        { date: '2023-02-01', price: 100.5 },
        { date: '2023-03-01', price: 101.0 },
        { date: '2023-04-01', price: 101.2 },
        { date: '2023-05-01', price: 101.5 },
    ],
  },
  {
        cusip: 'INE115A07RB7',
        issuer: 'Indian Railway Finance Corporation Limited',
        coupon: 6.65,
        maturityDate: '2030-05-20',
        price: 99.0146,
        yield: 6.8950,
        rating: 'AAA',
        type: 'Corporate',
        priceHistory: [
            { date: '2023-01-01', price: 98.5 },
            { date: '2023-02-01', price: 99.0 },
            { date: '2023-03-01', price: 99.2 },
            { date: '2023-04-01', price: 99.5 },
            { date: '2023-05-01', price: 99.8 },
        ],
      },
  {
    cusip: 'IN2222222222',
    issuer: 'Government of India',
    coupon: 6.1,
    maturityDate: '2035-11-01',
    price: 100.5,
    yield: 6.0,
    rating: 'SOV',
    type: 'Treasury',
    priceHistory: [
      { date: '2023-01-01', price: 99.5 },
      { date: '2023-02-01', price: 99.8 },
      { date: '2023-03-01', price: 100.0 },
      { date: '2023-04-01', price: 100.2 },
      { date: '2023-05-01', price: 100.5 },
    ],
  },
  {
    cusip: 'IN3333333333',
    issuer: 'Power Finance Corporation',
    coupon: 7.25,
    maturityDate: '2032-09-15',
    price: 101.2,
    yield: 7.1,
    rating: 'AAA',
    type: 'Corporate',
    priceHistory: [
      { date: '2023-01-01', price: 100.0 },
      { date: '2023-02-01', price: 100.5 },
      { date: '2023-03-01', price: 100.8 },
      { date: '2023-04-01', price: 101.0 },
      { date: '2023-05-01', price: 101.2 },
    ],
  },
  {
    cusip: 'IN4444444444',
    issuer: 'Maharashtra State Government',
    coupon: 6.5,
    maturityDate: '2031-03-31',
    price: 99.7,
    yield: 6.7,
    rating: 'SOV',
    type: 'Municipal',
    priceHistory: [
      { date: '2023-01-01', price: 98.9 },
      { date: '2023-02-01', price: 99.1 },
      { date: '2023-03-01', price: 99.3 },
      { date: '2023-04-01', price: 99.5 },
      { date: '2023-05-01', price: 99.7 },
    ],
  },
];

const mockPortfolio: Bond[] = [
  { ...mockBonds[0], quantity: 100 },
  { ...mockBonds[2], quantity: 50 },
];

export const getBonds = async (): Promise<Bond[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBonds);
    }, 500);
  });
};

export const getPortfolio = async (): Promise<Bond[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockPortfolio);
      }, 500);
    });
  };