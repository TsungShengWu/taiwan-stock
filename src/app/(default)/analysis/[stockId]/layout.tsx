import { Container, Box } from '@mui/material';
import AnalysisMenu from '@/components/AnalysisMenu';

export default function AnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxWidth="lg">
      <Box display="flex" pt={3} pb={3} gap={2}>
        <AnalysisMenu />
        {children}
      </Box>
    </Container>
  );
}
