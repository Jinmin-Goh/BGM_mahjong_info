'use client';

import { useParams } from 'next/navigation';
import { Container, Box, Typography } from '@mui/material';

export default function UserInfoPage() {
  const params = useParams();
  const userName = params.userName;

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
          sx={{ fontSize: '3rem', fontWeight: 'bold' }}
        >
          {userName}
        </Typography>
      </Box>
    </Container>
  );
}