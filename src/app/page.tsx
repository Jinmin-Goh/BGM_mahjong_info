'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGroup } from '@/types/data';
import { Container } from '@mui/material';
import Title from './title';
import MainInfo from './main_info';
import FetchLoadButton from './fetch_load_button';
import MainDataTable from './main_data_table';
import LoadingData from './loading_data';

const Home: React.FC = () => {
  const [data, setData] = useState<DataGroup[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setError(null);
      const response = await axios.get('/api/data_loader');
      setData(response.data.data);
    } catch (error) {
      setError('Failed to load data');
    }
  };

  const handleFetchLoadDataChange = (data: DataGroup[] | null) => {
    setData(data);
  };

  // initial data load
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container maxWidth="xl" style={{ marginTop: '40px' }}>
      <Title />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data ? (
        <Container maxWidth="xl" style={{ marginTop: '40px' }}>
          <MainInfo data={data} />
          <FetchLoadButton onDataChange={handleFetchLoadDataChange} />
          <MainDataTable data={data} />
        </Container>
      ) : (
        <LoadingData />
      )}
    </Container>
  );
};

export default Home;
