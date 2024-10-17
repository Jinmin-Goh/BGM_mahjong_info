'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { DataGroup } from '@/types/data';
import { Button, Box } from '@mui/material';
import Update from '@mui/icons-material/Update';
// import Upload from '@mui/icons-material/Upload';
import HourglassBottomRounded from '@mui/icons-material/HourglassBottomRounded';

interface FetchLoadButtonProps {
  onDataChange: (_data: DataGroup[] | null) => void;
}

export default function FetchLoadButton({
  onDataChange,
}: FetchLoadButtonProps) {
  const [, setData] = useState<DataGroup[] | null>(null);
  const [, setError] = useState<string | null>(null);
  // const [, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = async () => {
    setIsFetching(true);
    try {
      setError(null);
      const response = await axios.get('/api/data_parser');
      setData(response.data.data);
      onDataChange(response.data.data);
    } catch (err) {
      console.log('Error:', err);
      setError('Failed to fetch data');
    } finally {
      setIsFetching(false);
    }
  };

  // const loadData = async () => {
  //   setIsLoading(true);
  //   try {
  //     setError(null);
  //     const response = await axios.get('/api/data_loader');
  //     setData(response.data.data);
  //     onDataChange(response.data.data);
  //   } catch (error) {
  //     setError('Failed to load data');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center">
      {/* <Button
				variant="contained"
				color="primary"
				size="medium"
				endIcon={<Upload />}
				style={{ borderRadius: '8px', padding: '10px 20px' }}
				onClick={loadData}
				disabled={isLoading}
			>
				{isLoading ? '불러오는 중...' : '데이터 불러오기'}
			</Button> */}
      <Button
        variant="contained"
        color="primary"
        size="medium"
        endIcon={isFetching ? <HourglassBottomRounded /> : <Update />}
        style={{ borderRadius: '15px', width: 180, height: 50 }}
        onClick={fetchData}
        disabled={isFetching}
      >
        {isFetching ? '갱신하는 중...' : '데이터 갱신하기'}
      </Button>
    </Box>
  );
}
