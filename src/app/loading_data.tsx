'use client';

import { Box, Typography, CircularProgress } from '@mui/material';

export default function LoadingData() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="10vh"
      gap={1}
    >
      <Typography variant="h1" align="center" sx={{ fontSize: '1.5rem' }}>
        데이터를 불러오는 중입니다...
      </Typography>
      <CircularProgress size={28} thickness={6} />
    </Box>
  );
}
