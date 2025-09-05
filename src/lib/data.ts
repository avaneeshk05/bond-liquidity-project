import { Bond, PortfolioBond, Offer } from './types';

const mockBonds: Bond[] = [
  {
    cusip: 'IN1234567890',
    issuer: 'Reliance Industries Ltd.',
    coupon: 7.5,
    maturityDate: '2030-12-31',
    paymentFrequency: 'Half-Yearly',
    price: 102.0,
    yield: 7.2,
    rating: 'AAA',
    type: 'Corporate',
    fractional: true,
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
    paymentFrequency: 'Annual',
    price: 101.5,
    yield: 6.5,
    rating: 'AA+',
    type: 'Corporate',
    fractional: true,
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
        paymentFrequency: 'Annual',
        price: 99.0146,
        yield: 6.8950,
        rating: 'AAA',
        type: 'Corporate',
        fractional: true,
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
    paymentFrequency: 'Half-Yearly',
    price: 100.5,
    yield: 6.0,
    rating: 'SOV',
    type: 'Treasury',
    fractional: false,
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
    paymentFrequency: 'Quarterly',
    price: 101.2,
    yield: 7.1,
    rating: 'AAA',
    type: 'Corporate',
    fractional: true,
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
    paymentFrequency: 'Annual',
    price: 99.7,
    yield: 6.7,
    rating: 'SOV',
    type: 'Municipal',
    fractional: false,
    priceHistory: [
      { date: '2023-01-01', price: 98.9 },
      { date: '2023-02-01', price: 99.1 },
      { date: '2023-03-01', price: 99.3 },
      { date: '2023-04-01', price: 99.5 },
      { date: '2023-05-01', price: 99.7 },
    ],
  },
];

const mockPortfolio: PortfolioBond[] = [
  { ...mockBonds[0], quantity: 100 },
  { ...mockBonds[2], quantity: 50 },
];

const mockOffers: Offer[] = [
    { id: 'offer-1', cusip: 'IN1234567890', type: 'sell', price: 102.10, quantity: 50 },
    { id: 'offer-2', cusip: 'IN1234567890', type: 'sell', price: 102.15, quantity: 100 },
    { id: 'offer-3', cusip: 'IN1234567890', type: 'sell', price: 102.20, quantity: 25.5 },
    { id: 'offer-4', cusip: 'IN0987654321', type: 'sell', price: 101.60, quantity: 200 },
    { id: 'offer-5', cusip: 'INE115A07RB7', type: 'sell', price: 99.05, quantity: 75 },
    { id: 'offer-6', cusip: 'INE115A07RB7', type: 'sell', price: 99.10, quantity: 125 },
    // Mock Buy Offers (Bids)
    { id: 'offer-7', cusip: 'IN1234567890', type: 'buy', price: 102.05, quantity: 70 },
    { id: 'offer-8', cusip: 'IN1234567890', type: 'buy', price: 102.00, quantity: 30 },
    { id: 'offer-9', cusip: 'IN0987654321', type: 'buy', price: 101.55, quantity: 150 },
];

export const getBonds = async (): Promise<Bond[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBonds);
    }, 500);
  });
};

export const getPortfolio = async (): Promise<PortfolioBond[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockPortfolio);
      }, 500);
    });
  };

export const getBondByCusip = async (cusip: string): Promise<Bond | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBonds.find(bond => bond.cusip === cusip));
    }, 200);
  });
};

export const getOffersByCusip = async (cusip: string): Promise<Offer[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockOffers.filter(offer => offer.cusip === cusip && offer.type === 'sell'));
        }, 300);
    });
};

export const getBuyOffersByCusip = async (cusip: string): Promise<Offer[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockOffers.filter(offer => offer.cusip === cusip && offer.type === 'buy'));
        }, 300);
    });
};

export const getPortfolioBondByCusip = async (cusip: string): Promise<PortfolioBond | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPortfolio.find(bond => bond.cusip === cusip));
    }, 200);
  });
};