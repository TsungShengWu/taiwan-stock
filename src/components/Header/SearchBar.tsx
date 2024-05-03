'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Autocomplete, TextField, Snackbar, Alert } from '@mui/material';
import { getStockInfoList } from '@/actions';
import { Pathname } from '@/routes';

interface Option {
  label: string;
  id: string;
}

export default function SearchBar() {
  const [options, setOptions] = useState<Option[]>([]);
  const [error, setError] = useState<string>();
  const { push } = useRouter();

  const handleChange = useCallback(
    (_: any, option: Option | null) => {
      if (option) push(Pathname.getMonthlyRevenue(option.id));
    },
    [push],
  );

  const handleClose = useCallback(
    (_?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') return;
      setError(undefined);
    },
    [],
  );

  useEffect(() => {
    async function getData() {
      try {
        const data = await getStockInfoList();
        const duplicates = new Set<string>();
        const options = data.reduce((acc, { stock_id, stock_name }) => {
          if (!duplicates.has(stock_id)) {
            acc.push({
              label: `${stock_id} ${stock_name}`,
              id: stock_id,
            });
            duplicates.add(stock_id);
          }
          return acc;
        }, [] as Option[]);

        setOptions(options);
      } catch (e: any) {
        setError(e.message);
      }
    }

    getData();
    setInterval(getData, 3600000); // Fetch data every hour.
  }, []);

  return (
    <>
      <Autocomplete
        size="small"
        loadingText="載入資料中..."
        noOptionsText="無相符結果"
        sx={{ width: 320 }}
        options={options}
        renderInput={(props) => (
          <TextField {...props} placeholder="輸入台股代號，查看公司價值" />
        )}
        onChange={handleChange}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!error}
        onClose={handleClose}
      >
        <Alert
          severity="error"
          variant="outlined"
          sx={{ width: '100%', bgcolor: 'background.paper' }}
          onClose={handleClose}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
