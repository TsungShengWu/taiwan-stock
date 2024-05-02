import { useRef, useEffect } from 'react';
import {
  styled,
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { MonthlyRevenueData } from '@/types';

const ColoredRow = styled(TableRow)(({ theme: { palette } }) => ({
  '&:nth-child(odd)': {
    backgroundColor:
      palette.mode === 'light' ? palette.grey[100] : palette.grey[800],
  },
  '&:nth-child(even)': {
    backgroundColor: palette.background.default,
  },
  '&:last-child > th, &:last-child > td': {
    borderBottom: 'none',
  },
}));

const HeadCell = styled(TableCell)(() => ({
  textWrap: 'nowrap',
  fontWeight: 'bold',
}));

export default function RevenueTable({ data }: { data: MonthlyRevenueData[] }) {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollLeft = boxRef.current.scrollWidth;
    }
  }, [data]);

  return (
    <Box ref={boxRef} sx={{ display: 'flex', overflow: 'scroll' }}>
      <Table sx={{ position: 'sticky', left: 0 }}>
        <TableBody>
          <ColoredRow>
            <HeadCell component="th">年度月份</HeadCell>
          </ColoredRow>
          <ColoredRow>
            <HeadCell component="th">每月營收(千元)</HeadCell>
          </ColoredRow>
          <ColoredRow>
            <HeadCell component="th">單月營收年增率(%)</HeadCell>
          </ColoredRow>
        </TableBody>
      </Table>
      <Table>
        <TableBody>
          <ColoredRow>
            {data.map(({ year, month }) => (
              <HeadCell key={`${year}${month}`} align="right">
                {`${year}${month > 9 ? '' : '0'}${month}`}
              </HeadCell>
            ))}
          </ColoredRow>
          <ColoredRow>
            {data.map(({ year, month, monthlyRevenue }) => (
              <TableCell key={`${year}${month}`} align="right">
                {monthlyRevenue}
              </TableCell>
            ))}
          </ColoredRow>
          <ColoredRow>
            {data.map(({ year, month, growthRate }) => (
              <TableCell key={`${year}${month}`} align="right">
                {growthRate?.toFixed(2) ?? ''}
              </TableCell>
            ))}
          </ColoredRow>
        </TableBody>
      </Table>
    </Box>
  );
}
