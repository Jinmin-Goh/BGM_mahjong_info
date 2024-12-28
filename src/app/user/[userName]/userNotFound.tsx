'use client';

import { Box, Typography } from '@mui/material';
import ReturnMainButton from './returnMainButton';

export default function UserNotFound() {
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
        기록이 없는 유저명입니다.
      </Typography>
    </Box>
  );
}
