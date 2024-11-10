'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import Info from '@mui/icons-material/Info';

export default function RulesButton() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push('/rules');
  };

  return (
    <Button
      variant="contained"
      color="primary"
      size="medium"
      startIcon={<Info />}
      style={{ borderRadius: '15px', width: 180, height: 50 }}
      onClick={handleNavigation}
    >
      BGM 기록작 규정
    </Button>
  );
}
