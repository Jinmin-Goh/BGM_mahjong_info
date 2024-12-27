'use client';

import { Box, Typography } from '@mui/material';
import { UserData } from '@/types/userData';
import { DataGroup } from '@/types/data';
import PieChart from './pieChart';
import ReturnMainButton from './returnMainButton';
import UserSummary from './userSummary';
import RecentPlaceGraph from './recentPlaceGraph';
import UmaGraph from './umaGraph';

interface UserInfoMainPageProps {
  userName: string | null;
  userData: UserData | undefined;
  filteredUserLogData: DataGroup[] | null;
}

export default function UserInfoMainPage({
  userName,
  userData,
  filteredUserLogData,
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
          <RecentPlaceGraph
            filteredUserLogData={filteredUserLogData}
            userName={userName}
          />
          <UmaGraph
            filteredUserLogData={filteredUserLogData}
            userName={userName}
          />
        </Box>
      </Box>
    </Box>
  );
}
