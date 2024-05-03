'use server';

import { StockInfo, MonthlyRevenue } from './types';

const BASE_URL = `https://api.finmindtrade.com/api/v4/`;
let token = '';

export async function login() {
  const result = await fetch(`${BASE_URL}login`, {
    method: 'POST',
    body: new URLSearchParams({
      user_id: process.env.FINMIND_USER_ID ?? '',
      password: process.env.FINMIND_PASSWORD ?? '',
    }).toString(),
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    next: { revalidate: 3600 }, // Revalidate at most every hour.
  }).then((res) => res.json());

  if (result.status === 200) {
    token = result.token;
    return;
  }
  throw new Error(result.msg);
}

login();

export async function getStockInfoList(stockId?: string): Promise<StockInfo[]> {
  const result = await fetch(
    `${BASE_URL}data?token=${token}${stockId ? `&data_id=${stockId}` : ''}&dataset=TaiwanStockInfo`,
    { next: { revalidate: 3600 } }, // Revalidate at most every hour.
  ).then((res) => res.json());

  if (result.status === 200) {
    return result.data;
  } else {
    // Invalid/Expired token.
    if (result.msg.includes('Token')) {
      await login();
      return getStockInfoList(stockId);
    } else {
      throw new Error(result.msg);
    }
  }
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

  if (result.status === 200) {
    return result.data;
  } else {
    // Invalid/Expired token.
    if (result.msg.includes('Token')) {
      await login();
      return getMonthlyRevenue(stockId, startDate, endDate);
    } else {
      throw new Error(result.msg);
    }
  }
}
