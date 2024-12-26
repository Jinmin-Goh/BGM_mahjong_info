'use client';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { UserData } from '@/types/userData';

interface PieChartProps {
  userData: UserData | undefined;
}

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ userData }: PieChartProps) {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: { dataIndex: number }) => {
            const dataIndex = context.dataIndex;

            const userCount = [
              userData?.firstPlaceCount,
              userData?.secondPlaceCount,
              userData?.thirdPlaceCount,
              userData?.fourthPlaceCount,
            ];
            const userRate = [
              userData?.firstPlaceRate,
              userData?.secondPlaceRate,
              userData?.thirdPlaceRate,
              userData?.fourthPlaceRate,
            ];

            const count = userCount[dataIndex];
            const percentage = userRate[dataIndex];

            return [
              ` ${dataIndex + 1}위 비율: ${(percentage! * 100).toFixed(2)}%`,
              ` ${dataIndex + 1}위 횟수: ${count}회`,
            ];
          },
        },
        titleFont: {
          size: 20,
        },
        bodyFont: {
          size: 16,
        },
        padding: 10,
      },
      legend: {
        labels: {
          font: {
            size: 20,
          },
          color: '#333',
        },
      },
    },
  };

  const chartData = {
    labels: ['1위', '2위', '3위', '4위'],
    datasets: [
      {
        label: 'Count',
        data: [
          userData?.firstPlaceCount,
          userData?.secondPlaceCount,
          userData?.thirdPlaceCount,
          userData?.fourthPlaceCount,
        ],
        backgroundColor: ['#FF6384', '#FFCE56', '#4bc0c0', '#36A2EB'],
      },
    ],
  };

  return (
    <div style={{ width: '400px', height: '400px' }}>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
}
