'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGroup } from '@/types/data';
import { Button, Stack, Container, Box, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Update from '@mui/icons-material/Update';
import Upload from '@mui/icons-material/Upload';
import MainDataTable from './main_data_table';

const Home: React.FC = () => {
  const [data, setData] = useState<DataGroup[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = async () => {
    setIsFetching(true);
    try {
      setError(null);
      const response = await axios.get('/api/data_parser');
      setData(response.data.data);
    } catch (error) {
      setError('Failed to fetch data');
    } finally {
      setIsFetching(false);
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      setError(null);
      const response = await axios.get('/api/data_loader');
      setData(response.data.data);
    } catch (error) {
      setError('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container maxWidth="xl" style={{ marginTop: '40px' }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="15vh"
      >
        <Typography
          variant="h1"
          align="center"
          sx={{ fontSize: '2rem', fontWeight: 'bold' }}
          gutterBottom
        >
          BGM 기록작 대국 기록 인포
        </Typography>
      </Box>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            endIcon={<Upload />}
            style={{ borderRadius: '8px', padding: '10px 20px' }}
            onClick={loadData}
            disabled={isLoading}
          >
            {isLoading ? '불러오는 중...' : '데이터 불러오기'}
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            endIcon={<Update />}
            style={{ borderRadius: '8px', padding: '10px 20px' }}
            onClick={fetchData}
            disabled={isFetching}
          >
            {isFetching ? '갱신하는 중...' : '데이터 갱신하기'}
          </Button>
        </Stack>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {data ? <MainDataTable data={data} /> : <p>데이터 로드 전입니다. 데이터를 로드해주세요.</p>}
      </div>
    </Container>
  );
};

export default Home;
