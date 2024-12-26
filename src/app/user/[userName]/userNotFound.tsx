'use client';

import { Box, Typography } from '@mui/material';

export default function UserNotFound() {
  return (
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
        기록이 없는 유저명입니다.
      </Typography>
    </Box>
  );
}
