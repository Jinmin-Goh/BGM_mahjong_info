'use client';

import React from 'react';
import { Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';
import { DataGroup } from '@/types/data';
import moment from 'moment-timezone';

interface RecentPlaceGraphProps {
  filteredUserLogData: DataGroup[] | null;
  userName: string | null;
}

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

export default function RecentPlaceGraph({
  filteredUserLogData,
  userName,
}: RecentPlaceGraphProps) {
  const placeData = filteredUserLogData?.slice(-30).map((item) => {
    if (item.firstPlaceName === userName) {
      return 1;
    }
    if (item.secondPlaceName === userName) {
      return 2;
    }
    if (item.thirdPlaceName === userName) {
      return 3;
    }
    if (item.fourthPlaceName === userName) {
      return 4;
    }
  });

  const getPointColor = (rank: number) => {
    switch (rank) {
      case 1:
        return '#FF6384';
      case 2:
        return '#FFCE56';
      case 3:
        return '#4bc0c0';
      case 4:
        return '#36A2EB';
      default:
        return '#CCCCCC';
    }
  };

  const pointBackgroundColor = placeData?.map((rank) =>
    rank !== undefined ? getPointColor(rank) : '#CCCCCC'
  );

  const graphData = {
    labels: Array(placeData?.length).fill(''),
    datasets: [
      {
        label: '대국 일자',
        data: placeData,
        fill: false,
        borderColor: '#666666',
        pointBackgroundColor: pointBackgroundColor,
        pointBorderColor: '#666666',
        backgroundColor: '#42A5F5',
        tension: 0.1,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const graphOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: { dataIndex: number }) => {
            const dataIndex = context.dataIndex;

            const dateList = filteredUserLogData?.slice(-30).map((item) => {
              return item.timestamp;
            });
            const firstPlaceNameList = filteredUserLogData
              ?.slice(-30)
              .map((item) => {
                return item.firstPlaceName;
              });
            const firstPlaceScoreList = filteredUserLogData
              ?.slice(-30)
              .map((item) => {
                return item.firstPlaceScore;
              });
            const secondPlaceNameList = filteredUserLogData
              ?.slice(-30)
              .map((item) => {
                return item.secondPlaceName;
              });
            const secondPlaceScoreList = filteredUserLogData
              ?.slice(-30)
              .map((item) => {
                return item.secondPlaceScore;
              });
            const thirdPlaceNameList = filteredUserLogData
              ?.slice(-30)
              .map((item) => {
                return item.thirdPlaceName;
              });
            const thirdPlaceScoreList = filteredUserLogData
              ?.slice(-30)
              .map((item) => {
                return item.thirdPlaceScore;
              });
            const fourthPlaceNameList = filteredUserLogData
              ?.slice(-30)
              .map((item) => {
                return item.fourthPlaceName;
              });
            const fourthPlaceScoreList = filteredUserLogData
              ?.slice(-30)
              .map((item) => {
                return item.fourthPlaceScore;
              });
            const date = dateList?.[dataIndex];
            const firstPlaceName = firstPlaceNameList?.[dataIndex];
            const firstPlaceScore = firstPlaceScoreList?.[dataIndex];
            const secondPlaceName = secondPlaceNameList?.[dataIndex];
            const secondPlaceScore = secondPlaceScoreList?.[dataIndex];
            const thirdPlaceName = thirdPlaceNameList?.[dataIndex];
            const thirdPlaceScore = thirdPlaceScoreList?.[dataIndex];
            const fourthPlaceName = fourthPlaceNameList?.[dataIndex];
            const fourthPlaceScore = fourthPlaceScoreList?.[dataIndex];

            return [
              ` ${moment
                .tz(date, 'Asia/Seoul')
                .format('YYYY년 MM월 DD일 HH시 mm분')}`,
              `${firstPlaceName}: ${firstPlaceScore}`,
              `${secondPlaceName}: ${secondPlaceScore}`,
              `${thirdPlaceName}: ${thirdPlaceScore}`,
              `${fourthPlaceName}: ${fourthPlaceScore}`,
            ];
          },
        },
        titleFont: {
          size: 20,
        },
        bodyFont: {
          size: 16,
        },
        padding: 8,
      },
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: '최근 순위',
        font: {
          size: 30,
        },
      },
    },
    scales: {
      x: {
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
        reverse: true,
        ticks: {
          stepSize: 1,
          callback: (value: string | number) => `${value}위`,
          font: {
            size: 16,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  console.log(placeData);

  return (
    <Box
      sx={{
        width: '550px',
        height: '300px',
        margin: '0 auto',
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
