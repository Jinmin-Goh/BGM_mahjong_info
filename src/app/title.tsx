'use client';

import { Container, Box, Typography } from '@mui/material';

export default function Title() {
  return (
    <Container maxWidth="xl" style={{ marginTop: '40px' }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="15vh"
      >
        <Typography
          variant="h1"
          align="center"
          sx={{ fontSize: '3rem', fontWeight: 'bold' }}
        >
          BGM 기록작 대국 기록 인포
        </Typography>
      </Box>
      <Box justifyContent="center" alignItems="center" minHeight="10vh">
        <Typography
          variant="h1"
          align="center"
          sx={{ fontSize: '2rem' }}
          gutterBottom
        >
          "麻雀って楽しいよね！"
        </Typography>
      </Box>
    </Container>
  );
}
