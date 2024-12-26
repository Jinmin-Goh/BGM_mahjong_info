'use client';

import { Box, Typography } from '@mui/material';
import { UserData } from '@/types/userData';
import PieChart from './pieChart';
import ReturnMainButton from './returnMainButton';
import UserSummary from './userSummary';

interface UserInfoMainPageProps {
  userName: string | null;
  userData: UserData | undefined;
}

export default function UserInfoMainPage({
  userName,
  userData,
}: UserInfoMainPageProps) {
  return (
    <Box>
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
          {userName}
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="15vh"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="15vh"
          style={{ marginTop: '30px' }}
        >
          <PieChart userData={userData} />
          <UserSummary userData={userData} />
        </Box>
      </Box>
    </Box>
  );
}
