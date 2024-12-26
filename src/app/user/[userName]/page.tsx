'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Container, Box, Typography } from '@mui/material';
import { UserData } from '@/types/userData';

export default function UserInfoPage() {
  const params = useParams();
  const userName = params.userName as string;
  const [userData, setUserData] = useState<Map<string, UserData> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadUserData = async () => {
    try {
      setError(null);
      const response = await fetch('/api/user_data_loader', {
        next: {
          revalidate: 0,
        },
      });
      const result: Map<string, UserData> = new Map(Object.entries(await response.json()));
      setUserData(result);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load user data');
    }
  }
  
  useEffect(() => {
    loadUserData();
    console.log(typeof userName);
  }, []);

  return (
    <Container maxWidth="xl" style={{ marginTop: '40px' }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="15vh"
      >
        {userData?.has(userName) ? (
          <Typography
            variant="h1"
            align="center"
            sx={{ fontSize: '3rem', fontWeight: 'bold' }}
          >
            {userName}
          </Typography>
        ) : (
          <Typography
            variant="h1"
            align="center"
            sx={{ fontSize: '3rem', fontWeight: 'bold' }}
          >
            기록이 없는 유저명입니다.
          </Typography>
        )}
      </Box>
    </Container>
  );
}
