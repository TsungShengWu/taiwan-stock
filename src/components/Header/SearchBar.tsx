'use client';

import { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { getStockInfoList } from '@/actions';

interface Option {
  label: string;
  id: string;
}

export default function SearchBar() {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    async function getData() {
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
    }

    getData();
    setInterval(getData, 3600000); // Fetch data every hour.
  }, []);

  return (
    <Autocomplete
      size="small"
      loadingText="載入資料中..."
      noOptionsText="無相符結果"
      sx={{ width: 320 }}
      options={options}
      renderInput={(props) => (
        <TextField {...props} placeholder="輸入台股代號，查看公司價值" />
      )}
    />
  );
}
