'use server';

import { StockInfo, MonthlyRevenue } from './types';

const BASE_URL = `https://api.finmindtrade.com/api/v4/`;
let token = '';

export async function login() {
  token = await fetch(
    `${BASE_URL}login?user_id=${process.env.FINMIND_USER_ID}&password=${process.env.FINMIND_PASSWORD}`,
    { next: { revalidate: 3600 } }, // Revalidate at most every hour.
  ).then((res) => res.json());
}

export async function getStockInfoList(stockId?: string): Promise<StockInfo[]> {
  const result = await fetch(
    `${BASE_URL}data?token=${token}${stockId ? `&data_id=${stockId}` : ''}&dataset=TaiwanStockInfo`,
    { next: { revalidate: 3600 } }, // Revalidate at most every hour.
  ).then((res) => res.json());

  // Invalid token.
  if (result.status === 400) {
    await login();
    return getStockInfoList();
  }

  return result.data;
}

export async function getMonthlyRevenue(
  stockId: string,
  startDate: string,
  endDate: string,
): Promise<MonthlyRevenue[]> {
  const result = await fetch(
    `${BASE_URL}data?token=${token}&data_id=${stockId}&start_date=${startDate}&end_date=${endDate}&dataset=TaiwanStockMonthRevenue`,
    { next: { revalidate: 3600 } }, // Revalidate at most every hour.
  ).then((res) => res.json());

  if (result.status === 400) {
    await login();
    return getMonthlyRevenue(stockId, startDate, endDate);
  }

  return result.data;
}
