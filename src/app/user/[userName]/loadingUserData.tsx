'use client';

import { Box, Typography, CircularProgress } from '@mui/material'

export default function LoadingUserData() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="10vh"
      gap={1}
    >
      <Typography
        variant="h1"
        align="center"
        sx={{ fontSize: '3rem', fontWeight: 'bold' }}
      >
        유저 데이터를 불러오는 중입니다...
      </Typography>
      <CircularProgress size={40} thickness={6} />
    </Box>
  );
}