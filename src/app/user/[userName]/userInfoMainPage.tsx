'use client';

import { Box, Typography, Paper, Grid } from '@mui/material';
import { UserData } from '@/types/userData';
import moment from 'moment-timezone';
import PieChart from './pieChart';
import ReturnMainButton from './returnMainButton';

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
          <Paper sx={{ p: 4, maxWidth: 800, margin: 'auto', mt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="subtitle1" fontWeight="bold" fontSize={20}>
                  전체 대국 수
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontSize={20}>
                  {userData?.totalPlayCount} 반장
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1" fontWeight="bold" fontSize={20}>
                  평균 순위
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontSize={20}>
                  {userData?.averagePlace}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1" fontWeight="bold" fontSize={20}>
                  총 우마
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontSize={20}>
                  {userData?.totalUma
                    ? userData.totalUma.toFixed(1)
                    : 'Wrong data'}{' '}
                  ({userData?.currentPlace}위)
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1" fontWeight="bold" fontSize={20}>
                  평균 우마
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontSize={20}>
                  {userData?.averageUma
                    ? userData.averageUma.toFixed(2)
                    : 'Wrong data'}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1" fontWeight="bold" fontSize={20}>
                  총 득점
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontSize={20}>
                  {userData?.totalScoreSum.toLocaleString('ko-KR')} 점
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1" fontWeight="bold" fontSize={20}>
                  평균 득점
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontSize={20}>
                  {userData?.averageGainedScore.toLocaleString('ko-KR')} 점
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1" fontWeight="bold" fontSize={20}>
                  연대율
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontSize={20}>
                  {userData?.firstPlaceRate && userData?.secondPlaceRate
                    ? (
                        (userData.firstPlaceRate + userData.secondPlaceRate) *
                        100
                      ).toFixed(2)
                    : 'Wrong data'}
                  %
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1" fontWeight="bold" fontSize={20}>
                  토비율
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontSize={20}>
                  {userData?.tobiRate
                    ? (userData.tobiRate * 100).toFixed(2)
                    : 'Wrong data'}
                  % ({userData?.tobiCount}회)
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1" fontWeight="bold" fontSize={20}>
                  개인 최고점
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontSize={20}>
                  {userData?.userHighestScore.toLocaleString('ko-KR')}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1" fontWeight="bold" fontSize={20}>
                  개인 최저점
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontSize={20}>
                  {userData?.userLowestScore.toLocaleString('ko-KR')}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1" fontWeight="bold" fontSize={20}>
                  첫 대국일
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontSize={20}>
                  {moment
                    .tz(userData?.firstPlayDate, 'Asia/Seoul')
                    .format('YYYY년 MM월 DD일')}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1" fontWeight="bold" fontSize={20}>
                  최근 대국일
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontSize={20}>
                  {moment
                    .tz(userData?.recentPlayDate, 'Asia/Seoul')
                    .format('YYYY년 MM월 DD일')}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
