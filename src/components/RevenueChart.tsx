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
import { Chart, ChartProps } from 'react-chartjs-2';
import { useCustomTheme } from '@/theme';

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

type CustomChartProps = ChartProps<'bar' | 'line', number[], string>['options'];

export default function RevenueChart() {
  const { palette } = useCustomTheme();

  const options = useMemo<CustomChartProps>(
    () => ({
      responsive: true,
      scales: {
        x: {
          ticks: { color: palette.text.primary },
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
    }),
    [palette],
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
            data: [50, 50, 50, 50],
          },
          {
            type: 'bar',
            label: '每月營收',
            yAxisID: 'yBar',
            backgroundColor: `rgba(${palette.warning.lightChannel} / 0.5)`,
            borderWidth: 1,
            borderColor: palette.warning.main,
            data: [1000, 2000, 3000, 4000],
          },
        ],
        labels: ['January', 'February', 'March', 'April'],
      }}
      options={options}
    />
  );
}
