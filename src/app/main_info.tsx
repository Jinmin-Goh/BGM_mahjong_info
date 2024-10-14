'use client';

import React, { useEffect, useState } from 'react';
import { DataGroup } from '@/types/data';
import { Container, Typography } from '@mui/material';

interface MainInfoProps {
  data: DataGroup[];
}

export default function MainInfo({ data }: MainInfoProps) {
  return (
    <Container maxWidth="xl" style={{ marginTop: '40px' }}>
      <Typography variant="h1" align="center" sx={{ fontSize: '1.3rem', lineHeight: 1.5}}>
				기록 시작 일자는 2024년 6월 18일입니다.<br />
        현재까지 총 {data.length}반장이 진행되었으며, 총 ???명의 작사가 참여했습니다.<br />
				역대 최고점은 ???점(유저명), 최저점은 ???점(유저명)입니다.<br />
				가장 대국을 많이 치른 사람은 ???회의 ???입니다.<br />
				가장 대국이 많이 있었던 날은 ???회의 ???입니다. 
      </Typography>
    </Container>
  );
}
