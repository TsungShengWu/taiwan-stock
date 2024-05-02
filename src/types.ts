export interface StockInfo {
  stock_id: string;
  stock_name: string;
  type: string;
  industry_category: string;
  date: string;
}

export interface MonthlyRevenue {
  stock_id: string;
  country: string;
  date: string;
  revenue: number;
  revenue_month: number;
  revenue_year: number;
}

export interface MonthlyRevenueData {
  year: number;
  month: number;
  monthlyRevenue: number;
  growthRate?: number;
}
