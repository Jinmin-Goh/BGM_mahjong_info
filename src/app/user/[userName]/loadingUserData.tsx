'use client';

import { Box, Typography, CircularProgress } from '@mui/material';
import ReturnMainButton from './returnMainButton';

export default function LoadingUserData() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="15vh"
      position="relative"
    >
      <Box position="absolute" left={40}>
        <ReturnMainButton />
      </Box>
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
