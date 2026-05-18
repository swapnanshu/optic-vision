// lib/utils/price.ts
export const toDisplay = (paise: number): string =>
  `₹${(paise / 100).toLocaleString('en-IN')}`;

export const toPaise = (rupees: number): number =>
  Math.round(rupees * 100);
