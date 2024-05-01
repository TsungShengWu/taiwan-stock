export enum Segment {
  ANALYSIS = 'analysis',
  MONTHLY_REVENUE = 'monthly-revenue',
  EPS = 'eps',
  NAV = 'nav',
  INCOME_STATEMENT = 'income-statement',
  ASSETS = 'assets',
  LIABILITIES_AND_EQUITY = 'liabilities-and-equity',
  CASH_FLOW_STATEMENT = 'cash-flow-statement',
  DIVIDEND_POLICY = 'dividend-policy',
  E_REPORT = 'e-report',
}

export const Pathname = {
  getMonthlyRevenue: (stockId: string) =>
    `/${Segment.ANALYSIS}/${stockId}/${Segment.MONTHLY_REVENUE}`,
};
