'use client';

import { useRouter } from 'next/navigation';
import { IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowBack from '@mui/icons-material/ArrowBack';

export default function ReturnMainButton() {
  const router = useRouter();
  const theme = useTheme();

  const handleNavigation = () => {
    router.push('/');
  };

  return (
    <IconButton
      color="primary"
      size="medium"
      sx={{
        borderRadius: '50%',
        width: 50,
        height: 50,
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
        boxShadow: theme.shadows[2],
      }}
      onClick={handleNavigation}
    >
      <ArrowBack />
    </IconButton>
  );
}
