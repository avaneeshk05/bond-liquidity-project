import { Bond } from './types';

// Note: This is a simplified calculation and does not account for all day-count conventions (e.g., 30/360).
// For a production environment, a robust financial library is recommended.

const daysBetween = (date1: Date, date2: Date): number => {
  const oneDay = 24 * 60 * 60 * 1000;
  // Discard time and timezone information for consistent day difference
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.floor((utc1 - utc2) / oneDay);
};

export const calculateAccruedInterest = (settlementDate: Date, bond: Bond): { accruedInterest: number, lastCouponDate: Date, nextCouponDate: Date } => {
  const { coupon, maturityDate, paymentFrequency } = bond;
  const maturity = new Date(maturityDate);
  
  const paymentsPerYear = {
    'Annual': 1,
    'Half-Yearly': 2,
    'Quarterly': 4,
  }[paymentFrequency];

  const monthInterval = 12 / paymentsPerYear;

  let nextCouponDate = new Date(maturity);
  while (nextCouponDate > settlementDate) {
    nextCouponDate.setMonth(nextCouponDate.getMonth() - monthInterval);
  }
  const lastCouponDate = new Date(nextCouponDate);
  
  nextCouponDate.setMonth(nextCouponDate.getMonth() + monthInterval);

  const daysInPeriod = daysBetween(nextCouponDate, lastCouponDate);
  if (daysInPeriod === 0) return { accruedInterest: 0, lastCouponDate, nextCouponDate };

  const daysAccrued = daysBetween(settlementDate, lastCouponDate);
  
  const accruedInterest = (coupon / paymentsPerYear) * (daysAccrued / daysInPeriod);

  return { accruedInterest, lastCouponDate, nextCouponDate };
};