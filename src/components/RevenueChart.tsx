'use client';

import { useMemo } from 'react';
import {
  Chart as ChartJs,
  BarElement,
  BarController,
  LineElement,
  LineController,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Title,
  Tooltip,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { useCustomTheme } from '@/theme';
import { MonthlyRevenueData } from '@/types';

ChartJs.register(
  BarElement,
  BarController,
  LineElement,
  LineController,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Title,
  Tooltip,
);

export default function RevenueChart({ data }: { data: MonthlyRevenueData[] }) {
  const { palette } = useCustomTheme();

  const [lineData, barData, labels] = useMemo(
    () => [
      data.map((d) => d.growthRate),
      data.map((d) => d.monthlyRevenue),
      data.map((d) => `${d.year}-${d.month > 9 ? '' : '0'}${d.month}`),
    ],
    [data],
  );

  return (
    <Chart
      type="line"
      data={{
        datasets: [
          {
            type: 'line',
            label: '單月營收年增率(%)',
            yAxisID: 'yLine',
            borderColor: `rgba(${palette.error.mainChannel} / 0.8)`,
            data: lineData,
          },
          {
            type: 'bar',
            label: '每月營收',
            yAxisID: 'yBar',
            backgroundColor: `rgba(${palette.warning.lightChannel} / 0.5)`,
            borderWidth: 1,
            borderColor: palette.warning.main,
            data: barData,
          },
        ],
        labels,
      }}
      options={{
        responsive: true,
        scales: {
          x: {
            ticks: {
              color: palette.text.primary,
              callback: (_, idx) => {
                const { year, month } = data[idx];
                return month === 1 ? year : undefined;
              },
            },
            grid: { color: palette.divider },
          },
          yLine: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: '%',
              color: palette.text.primary,
            },
            ticks: {
              color: palette.text.primary,
              stepSize: 1,
            },
            grid: { drawOnChartArea: false },
          },
          yBar: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: '千元',
              color: palette.text.primary,
            },
            ticks: {
              color: palette.text.primary,
              callback: (value) => Number(value) / 1000,
            },
            grid: { color: palette.divider },
          },
        },
        plugins: {
          legend: {
            labels: { color: palette.text.primary },
          },
        },
      }}
    />
  );
}
