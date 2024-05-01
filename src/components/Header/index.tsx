import { AppBar, Toolbar, Stack, Typography } from '@mui/material';
import SearchBar from './SearchBar';
import ToggleTheme from './ToggleTheme';

export default function Header() {
  return (
    <AppBar color="default">
      <Toolbar>
        <Stack
          direction="row"
          justifyContent="space-between"
          width="100%"
          spacing={2}
        >
          <Typography variant="h5" alignSelf="center">
            台灣股市
          </Typography>
          <SearchBar />
          <ToggleTheme />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
