import { useColorScheme, ToggleButtonGroup, ToggleButton } from '@mui/material';
import {
  DarkModeOutlined,
  LightMode,
  SettingsBrightness,
} from '@mui/icons-material';

export default function ToggleTheme() {
  const { mode, setMode } = useColorScheme();

  return (
    <ToggleButtonGroup
      size="small"
      exclusive
      value={mode ?? 'system'}
      onChange={(_, newMode) => setMode(newMode ?? 'system')}
    >
      <ToggleButton value="dark">
        <DarkModeOutlined />
      </ToggleButton>
      <ToggleButton value="system">
        <SettingsBrightness />
      </ToggleButton>
      <ToggleButton value="light">
        <LightMode />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
