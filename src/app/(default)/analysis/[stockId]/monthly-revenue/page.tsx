'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  styled,
  Stack,
  Paper,
  Typography,
  Skeleton,
  Box,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { StockInfo, MonthlyRevenueData } from '@/types';
import { getStockInfoList, getMonthlyRevenue } from '@/actions';
import RevenueChart from '@/components/RevenueChart';

const SectionPaper = styled(Paper)(({ theme }) => ({
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
}));

export default function MonthlyRevenuePage({
  params: { stockId },
}: {
  params: { stockId: string };
}) {
  const [stockInfo, setStockInfo] = useState<StockInfo>();
  const [revenueData, setRevenueData] = useState<MonthlyRevenueData[]>();
  const [years, setYears] = useState('3');

  const handleChange = useCallback((e: SelectChangeEvent) => {
    setYears(e.target.value);
  }, []);

  useEffect(() => {
    if (stockId) {
      getStockInfoList(stockId).then((data) => {
        if (!data.length) {
          throw new Error('此公司不存在');
        }
        setStockInfo(data[0]);
      });
    }
  }, [stockId]);

  useEffect(() => {
    if (stockId) {
      const now = new Date();
      const endDate = now.toJSON().split('T')[0];

      // Get more data to calculate growth rate.
      const ys = Number(years);
      const month = now.getMonth() - 1;
      now.setFullYear(
        now.getFullYear() - ys - (month < 0 ? 2 : 1),
        month < 0 ? 11 : month,
      );
      const startDate = now.toJSON().split('T')[0];

      getMonthlyRevenue(stockId, startDate, endDate).then((data) => {
        // The number of data might be less than expected.
        const end = Math.max(data.length - ys * 12, 0);
        const newData = [] as MonthlyRevenueData[];

        for (let i = data.length - 1; i >= end; i--) {
          const curData = data[i];
          const lastYearData = data[i - 12];
          newData.push({
            year: curData.revenue_year,
            month: curData.revenue_month,
            monthlyRevenue: curData.revenue,
            growthRate: lastYearData
              ? (curData.revenue / lastYearData.revenue - 1) * 100
              : undefined,
          });
        }

        setRevenueData(newData.reverse());
      });
    }
  }, [stockId, years]);

  return (
    <Stack flex={1} spacing={2}>
      {stockInfo ? (
        <SectionPaper variant="outlined">
          <Typography variant="h6" fontWeight="bold">
            {`${stockInfo.stock_name} (${stockInfo.stock_id})`}
          </Typography>
        </SectionPaper>
      ) : (
        <Skeleton variant="rounded" height={48} />
      )}
      {revenueData ? (
        <SectionPaper variant="outlined">
          <Box
            display="flex"
            justifyContent="space-between"
            gap={2}
            marginBottom={2}
          >
            <Typography variant="h6" fontWeight="bold">
              每月營收
            </Typography>
            <Select size="small" value={years} onChange={handleChange}>
              <MenuItem value="3">近三年</MenuItem>
              <MenuItem value="5">近五年</MenuItem>
              <MenuItem value="8">近八年</MenuItem>
            </Select>
          </Box>
          <RevenueChart data={revenueData} />
        </SectionPaper>
      ) : (
        <Skeleton variant="rounded" height={48} />
      )}
    </Stack>
  );
}
