export interface Stock {
  id?: string;
  symbol: string;
  numShares: number;
  ppsPaid: number;
  totalPricePaid: number;
  currentPPS?: number;
  currentTotal?: number;
}
