'use client';

import { useCallback, useState, useEffect } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import useItems from './useItems';

export default function AnalysisMenu() {
  const items = useItems();
  const segment = useSelectedLayoutSegment();

  const findIndexOfSelectedItems = useCallback(() => {
    let subIndex = -1;
    const index = items.findIndex(({ subItems }) =>
      subItems.some((item, idx) => {
        if (item.segment === segment) {
          subIndex = idx;
          return true;
        }
        return false;
      }),
    );
    return [index, subIndex];
  }, [items, segment]);

  const [selectedIndices, setSelectedIndices] = useState(
    findIndexOfSelectedItems,
  );
  const subItems = items[selectedIndices[0]]?.subItems;

  useEffect(() => {
    setSelectedIndices(findIndexOfSelectedItems());
  }, [findIndexOfSelectedItems]);

  return (
    <Box display="flex">
      <List>
        {items.map(({ title, icon }, index) => (
          <ListItem key={title} disablePadding>
            <ListItemButton
              selected={index === selectedIndices[0]}
              sx={{ flexDirection: 'column' }}
            >
              {icon}
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {subItems?.length && (
        <>
          <Divider orientation="vertical" flexItem />
          <List>
            {subItems.map(({ title }, index) => (
              <ListItem key={title} disablePadding>
                <ListItemButton selected={index === selectedIndices[1]}>
                  <ListItemText primary={title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
}
