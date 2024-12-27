'use client';

import { Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { DataGroup } from '@/types/data';
import { parse } from 'date-fns';

interface UmaGraphProps {
  filteredUserLogData: DataGroup[] | null;
  userName: string | null;
}

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  Title
);

export default function UmaGraph({
  filteredUserLogData,
  userName,
}: UmaGraphProps) {
  var currUma = 0.0;
  var umaData: { x: Date; y: number }[] = [];

  filteredUserLogData?.forEach((data) => {
    if (data.firstPlaceName == userName) {
      currUma += 20 + (data.firstPlaceScore - 30000) / 1000;
      umaData.push({ x: data.timestamp, y: currUma });
    }
    if (data.secondPlaceName == userName) {
      currUma += 10 + (data.secondPlaceScore - 30000) / 1000;
      umaData.push({ x: data.timestamp, y: currUma });
    }
    if (data.thirdPlaceName == userName) {
      currUma += -10 + (data.thirdPlaceScore - 30000) / 1000;
      umaData.push({ x: data.timestamp, y: currUma });
    }
    if (data.fourthPlaceName == userName) {
      currUma += -20 + (data.fourthPlaceScore - 30000) / 1000;
      umaData.push({ x: data.timestamp, y: currUma });
    }
  });

  const graphData = {
    datasets: [
      {
        label: '우마',
        data: umaData,
        borderColor: '#42A5F5',
        backgroundColor: '#FF6384',
        pointColor: '#FF6384',
        pointBorderColor: '#FF6384',
        tension: 0.1,
        pointRadius: 1,
        pointHoverRadius: 2,
      },
    ],
  };

  const graphOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: '우마 그래프',
        font: {
          size: 25,
        },
      },
    },
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'day' as const,
          displayFormats: {
            day: 'yyMMdd',
          },
          tooltipFormat: 'yyyy년 MM월 dd일 HH시 mm분',
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 5,
          sampleSize: 5,
          font: {
            size: 14,
          },
        },
        title: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: false,
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 5,
          sampleSize: 5,
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <Box
      sx={{
        width: '550px',
        height: '300px',
        margin: '20px',
        padding: 2,
        border: '1px solid #ddd',
        borderRadius: 2,
        backgroundColor: '#FFFFFF',
      }}
    >
      <Line data={graphData} options={graphOptions} />
    </Box>
  );
}
