'use client';

import React, { useEffect, useState } from 'react';
import { DataGroup } from '@/types/data';
import { Container } from '@mui/material';
import Title from './title';
import MainInfo from './mainInfo';
import MainDataTable from './mainDataTable';
import LoadingData from './loadingData';

const Home: React.FC = () => {
  const [data, setData] = useState<DataGroup[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setError(null);
      const response = await fetch('/api/data_loader', {
        next: {
          revalidate: 0,
        }
      });
      const result: DataGroup[] = await response.json();
      setData(result);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load data');
    }
  };

  const handleChildDataUpdate = (updatedData: DataGroup[] | null) => {
    setData(updatedData);
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
          <MainInfo parentData={data} onDataChange={handleChildDataUpdate} />
          <MainDataTable data={data} />
        </Container>
      ) : (
        <LoadingData />
      )}
    </Container>
  );
};

export default Home;
