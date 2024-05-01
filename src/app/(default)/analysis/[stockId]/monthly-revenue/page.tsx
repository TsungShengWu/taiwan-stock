'use client';

import { useState, useEffect } from 'react';
import { styled, Stack, Paper, Typography, Skeleton } from '@mui/material';
import { StockInfo, MonthlyRevenue } from '@/types';
import { getStockInfoList, getMonthlyRevenue } from '@/actions';

const SectionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
}));

export default function MonthlyRevenuePage({
  params: { stockId },
}: {
  params: { stockId: string };
}) {
  const [stockInfo, setStockInfo] = useState<StockInfo>();
  const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenue[]>([]);

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
      getMonthlyRevenue(stockId, '2024-01-01', '2024-05-01').then(
        setMonthlyRevenue,
      );
    }
  }, [stockId]);

  return (
    <Stack flex={1}>
      {stockInfo ? (
        <SectionPaper variant="outlined">
          <Typography variant="h6" fontWeight="bold">
            {`${stockInfo.stock_name} (${stockInfo.stock_id})`}
          </Typography>
        </SectionPaper>
      ) : (
        <Skeleton variant="rounded" height={48} />
      )}
    </Stack>
  );
}
