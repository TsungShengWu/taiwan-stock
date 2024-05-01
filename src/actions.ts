'use server';

import { StockInfo } from './types';

const BASE_URL = `https://api.finmindtrade.com/api/v4/`;
let token = '';

export async function login() {
  token = await fetch(
    `${BASE_URL}login?user_id=${process.env.FINMIND_USER_ID}&password=${process.env.FINMIND_PASSWORD}`,
    { next: { revalidate: 3600 } }, // Revalidate at most every hour.
  ).then((res) => res.json());
}

export async function getStockInfoList(): Promise<StockInfo[]> {
  const result = await fetch(
    `${BASE_URL}data?token=${token}&dataset=TaiwanStockInfo`,
    { next: { revalidate: 3600 } }, // Revalidate at most every hour.
  ).then((res) => res.json());

  // Invalid token.
  if (result.status === 400) {
    await login();
    return getStockInfoList();
  }

  return result.data;
}
