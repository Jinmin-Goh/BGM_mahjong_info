'use client';

import React, { useEffect, useState } from 'react';
import { DataGroup } from '@/types/data';
import { Container, Button, Box, Typography, Collapse } from '@mui/material';
import FetchLoadButton from './fetchLoadButton';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRounded from '@mui/icons-material/ExpandLessRounded';

interface MainInfoProps {
  parentData: DataGroup[] | null;
  onDataChange: (changedData: DataGroup[] | null) => void;
}

export default function MainInfo({ parentData, onDataChange }: MainInfoProps) {
  const [data, setData] = useState<DataGroup[] | null>(parentData);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const toggleInfoOpen = () => setIsInfoOpen(!isInfoOpen);

  const handleFetchLoadDataChange = (data: DataGroup[] | null) => {
    setData(data);
    onDataChange(data);
  };

  return (
    <Container maxWidth="xl" style={{ marginTop: '40px' }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={'20px'}
      >
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          <Button
            variant="contained"
            onClick={toggleInfoOpen}
            endIcon={isInfoOpen ? <ExpandLessRounded /> : <ExpandMoreRounded />}
            sx={{
              width: 180,
              height: 50,
              borderRadius: '15px',
            }}
          >
            {isInfoOpen ? '접기' : '세부 정보 보기'}
          </Button>
        </Box>
        <FetchLoadButton onDataChange={handleFetchLoadDataChange} />
      </Box>
      <Typography
        variant="h1"
        align="center"
        sx={{ fontSize: '1.3rem', lineHeight: 1.5 }}
      >
        기록 시작 일자는 2024년 6월 18일입니다.
        <br />
        현재까지 총 {data?.length}반장이 진행되었으며, 총 ???명의 작사가
        참여했습니다.
        <br />
      </Typography>
      <Collapse in={isInfoOpen} timeout={300}>
        <Typography
          variant="h1"
          align="center"
          sx={{ fontSize: '1.3rem', lineHeight: 1.5 }}
        >
          역대 최고점은 ???점(유저명), 최저점은 ???점(유저명)입니다.
          <br />
          가장 대국을 많이 치른 사람은 ???(???회)입니다.
          <br />
          가장 대국이 많이 있었던 날은 ???(???회)입니다.
        </Typography>
      </Collapse>
    </Container>
  );
}
