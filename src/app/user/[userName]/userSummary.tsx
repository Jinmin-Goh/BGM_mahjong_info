'use client';

import { Paper, Grid, Typography } from '@mui/material';
import moment from 'moment-timezone';
import { UserData } from '@/types/userData';

interface UserSummaryProps {
  userData: UserData | undefined;
}

export default function UserSummary({ userData }: UserSummaryProps) {
  return (
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
            {userData?.averagePlace} 위
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1" fontWeight="bold" fontSize={20}>
            총 우마
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1" fontSize={20}>
            {userData?.totalUma ? userData.totalUma.toFixed(1) : 'Wrong data'} (
            {userData?.currentPlace}위)
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
            {userData?.userHighestScore.toLocaleString('ko-KR')} 점
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1" fontWeight="bold" fontSize={20}>
            개인 최저점
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1" fontSize={20}>
            {userData?.userLowestScore.toLocaleString('ko-KR')} 점
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
  );
}
