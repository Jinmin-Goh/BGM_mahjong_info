"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { DataGroup } from '@/types/data';

const Home: React.FC = () => {
  const [data, setData] = useState<DataGroup[]  | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setError(null); 
      const response = await axios.get('/api/data_parser'); 
      setData(response.data.data); 
    } catch (error) {
      setError('Failed to fetch data');
    }
  };

  const loadData = async () => {
    try {
      setError(null); 
      const response = await axios.get('/api/data_loader'); 
      setData(response.data.data); 
    } catch (error) {
      setError('Failed to load data');
    }
  };

  return (
    <div>
      <h1>BGM 마작 기록 인포 사이트</h1>

      <button onClick={loadData}>데이터 불러오기</button>
      <button onClick={fetchData}>데이터 갱신하기</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data ? (
        data.map((item, index) => (
          <div key={index} style={{ border: '1px solid #ccc', marginBottom: '20px', padding: '10px' }}>
            <p><strong>Timestamp:</strong> {item.timestamp}</p>
            <p><strong>1st Place:</strong> {item.first_place_name} / {item.first_place_score}</p>
            <p><strong>2nd Place:</strong> {item.second_place_name} / {item.second_place_score}</p>
            <p><strong>3rd Place:</strong> {item.third_place_name} / {item.third_place_score}</p>
            <p><strong>4th Place:</strong> {item.fourth_place_name} / {item.fourth_place_score}</p>
            <p><strong>Checksum:</strong> {item.checksum}</p>
            <p><strong>Comment:</strong> {item.comment}</p>
          </div>
        ))
      ) : (
        <p>데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default Home;