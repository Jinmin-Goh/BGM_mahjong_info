'use client';

import { Box, Typography } from '@mui/material';
import { UserData } from '@/types/userData';

interface UserInfoMainPageProps {
  userName: string | null;
  userData: UserData | undefined;
}

export default function UserInfoMainPage({
  userName,
  userData,
}: UserInfoMainPageProps) {
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
        {userName}
      </Typography>
    </Box>
  );
}
