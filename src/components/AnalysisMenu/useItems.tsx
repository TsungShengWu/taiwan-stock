import { useMemo } from 'react';
import {
  FiberNew,
  Article,
  Paid,
  GppGood,
  SignalCellularAlt,
  Scale,
  Person,
  Key,
  PieChart,
} from '@mui/icons-material';
import { Segment } from '@/routes';

interface Item {
  title: string;
  icon: React.ReactNode;
  subItems: {
    title: string;
    segment: string;
  }[];
}

export default function useItems() {
  return useMemo<Item[]>(
    () => [
      {
        title: '最新動態',
        icon: <FiberNew />,
        subItems: [],
      },
      {
        title: '財務報表',
        icon: <Article />,
        subItems: [
          {
            title: '每月營收',
            segment: Segment.MONTHLY_REVENUE,
          },
          {
            title: '每股盈餘',
            segment: Segment.EPS,
          },
          {
            title: '每股淨值',
            segment: Segment.NAV,
          },
          {
            title: '損益表',
            segment: Segment.INCOME_STATEMENT,
          },
          {
            title: '總資產',
            segment: Segment.ASSETS,
          },
          {
            title: '負債與股東權益',
            segment: Segment.LIABILITIES_AND_EQUITY,
          },
          {
            title: '現金流量表',
            segment: Segment.CASH_FLOW_STATEMENT,
          },
          {
            title: '股利政策',
            segment: Segment.DIVIDEND_POLICY,
          },
          {
            title: '電子書',
            segment: Segment.E_REPORT,
          },
        ],
      },
      {
        title: '獲利能力',
        icon: <Paid />,
        subItems: [],
      },
      {
        title: '安全性分析',
        icon: <GppGood />,
        subItems: [],
      },
      {
        title: '成長力分析',
        icon: <SignalCellularAlt />,
        subItems: [],
      },
      {
        title: '價值評估',
        icon: <Scale />,
        subItems: [],
      },
      {
        title: '董監與籌碼',
        icon: <Person />,
        subItems: [],
      },
      {
        title: '關鍵指標',
        icon: <Key />,
        subItems: [],
      },
      {
        title: '產品組合',
        icon: <PieChart />,
        subItems: [],
      },
    ],
    [],
  );
}
