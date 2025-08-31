import { Bond } from './types';

const mockBonds: Bond[] = [
  {
    cusip: '912828U69',
    issuer: 'US Treasury',
    coupon: 2.75,
    maturityDate: '2028-08-15',
    price: 98.5,
    yield: 3.15,
    rating: 'AAA',
    type: 'Treasury',
    priceHistory: [
      { date: '2023-01-01', price: 98.0 },
      { date: '2023-02-01', price: 98.2 },
      { date: '2023-03-01', price: 98.1 },
      { date: '2023-04-01', price: 98.4 },
      { date: '2023-05-01', price: 98.5 },
    ],
  },
  {
    cusip: '037833100',
    issuer: 'Apple Inc.',
    coupon: 3.2,
    maturityDate: '2029-05-11',
    price: 101.2,
    yield: 3.0,
    rating: 'AA+',
    type: 'Corporate',
    priceHistory: [
        { date: '2023-01-01', price: 100.5 },
        { date: '2023-02-01', price: 100.8 },
        { date: '2023-03-01', price: 101.0 },
        { date: '2023-04-01', price: 101.1 },
        { date: '2023-05-01', price: 101.2 },
    ],
  },
  {
    cusip: '594918104',
    issuer: 'Microsoft Corp',
    coupon: 2.525,
    maturityDate: '2027-06-01',
    price: 99.8,
    yield: 2.58,
    rating: 'AAA',
    type: 'Corporate',
    priceHistory: [
        { date: '2023-01-01', price: 99.0 },
        { date: '2023-02-01', price: 99.2 },
        { date: '2023-03-01', price: 99.5 },
        { date: '2023-04-01', price: 99.7 },
        { date: '2023-05-01', price: 99.8 },
    ],
  },
  {
    cusip: '649664107',
    issuer: 'State of New York',
    coupon: 4.0,
    maturityDate: '2035-11-01',
    price: 105.0,
    yield: 3.5,
    rating: 'AA',
    type: 'Municipal',
    priceHistory: [
        { date: '2023-01-01', price: 104.0 },
        { date: '2023-02-01', price: 104.3 },
        { date: '2023-03-01', price: 104.5 },
        { date: '2023-04-01', price: 104.8 },
        { date: '2023-05-01', price: 105.0 },
    ],
  },
];

const mockPortfolio: Bond[] = [
  { ...mockBonds[0], quantity: 100 },
  { ...mockBonds[2], quantity: 50 },
];

// Simulate API call
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