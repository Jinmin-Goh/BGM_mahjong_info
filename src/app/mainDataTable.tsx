'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Container,
  Box,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import moment from 'moment-timezone';
import { DataGroup } from '@/types/data';
import RulesButton from './rulesButton';
import CloseIcon from '@mui/icons-material/Close';

interface MainDataTableProps {
  data: DataGroup[];
}

type Order = 'asc' | 'desc';

export default function MainDataTable({ data }: MainDataTableProps) {
  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<keyof DataGroup>('timestamp');
  const [filter, setFilter] = React.useState<string>('');

  const handleRequestSort = (property: keyof DataGroup) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const clearFilter = () => {
    setFilter('');
  };

  const filteredData = React.useMemo(() => {
    return data.filter(
      (row) =>
        row.firstPlaceName.toLowerCase().includes(filter.toLowerCase()) ||
        row.secondPlaceName.toLowerCase().includes(filter.toLowerCase()) ||
        row.thirdPlaceName.toLowerCase().includes(filter.toLowerCase()) ||
        row.fourthPlaceName.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, data]);

  const sortedData = React.useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, order, orderBy]);

  return (
    <Container maxWidth="xl" style={{ marginTop: '40px' }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginBottom="20px"
        position="relative"
      >
        <Box position="absolute" left={0}>
          <RulesButton />
        </Box>
        <TextField
          label="대국자 이름"
          variant="outlined"
          value={filter}
          sx={{ width: 200 }}
          onChange={(e) => setFilter(e.target.value)}
          InputProps={{
            endAdornment: filter && (
              <InputAdornment position="end">
                <IconButton onClick={clearFilter}>
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ backgroundColor: '#e3f0d3' }}>
                <TableSortLabel
                  active={orderBy === 'timestamp'}
                  direction={orderBy === 'timestamp' ? order : 'asc'}
                  onClick={() => handleRequestSort('timestamp')}
                >
                  <strong>대국 시간</strong>
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" sx={{ backgroundColor: '#e3f0d3' }}>
                <TableSortLabel
                  active={orderBy === 'firstPlaceName'}
                  direction={orderBy === 'firstPlaceName' ? order : 'asc'}
                  onClick={() => handleRequestSort('firstPlaceName')}
                >
                  <strong>1위</strong>
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" sx={{ backgroundColor: '#e3f0d3' }}>
                <TableSortLabel
                  active={orderBy === 'firstPlaceScore'}
                  direction={orderBy === 'firstPlaceScore' ? order : 'asc'}
                  onClick={() => handleRequestSort('firstPlaceScore')}
                >
                  <strong>점수</strong>
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" sx={{ backgroundColor: '#e3f0d3' }}>
                <TableSortLabel
                  active={orderBy === 'secondPlaceName'}
                  direction={orderBy === 'secondPlaceName' ? order : 'asc'}
                  onClick={() => handleRequestSort('secondPlaceName')}
                >
                  <strong>2위</strong>
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" sx={{ backgroundColor: '#e3f0d3' }}>
                <TableSortLabel
                  active={orderBy === 'secondPlaceScore'}
                  direction={orderBy === 'secondPlaceScore' ? order : 'asc'}
                  onClick={() => handleRequestSort('secondPlaceScore')}
                >
                  <strong>점수</strong>
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" sx={{ backgroundColor: '#e3f0d3' }}>
                <TableSortLabel
                  active={orderBy === 'thirdPlaceName'}
                  direction={orderBy === 'thirdPlaceName' ? order : 'asc'}
                  onClick={() => handleRequestSort('thirdPlaceName')}
                >
                  <strong>3위</strong>
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" sx={{ backgroundColor: '#e3f0d3' }}>
                <TableSortLabel
                  active={orderBy === 'thirdPlaceScore'}
                  direction={orderBy === 'thirdPlaceScore' ? order : 'asc'}
                  onClick={() => handleRequestSort('thirdPlaceScore')}
                >
                  <strong>점수</strong>
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" sx={{ backgroundColor: '#e3f0d3' }}>
                <TableSortLabel
                  active={orderBy === 'fourthPlaceName'}
                  direction={orderBy === 'fourthPlaceName' ? order : 'asc'}
                  onClick={() => handleRequestSort('fourthPlaceName')}
                >
                  <strong>4위</strong>
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" sx={{ backgroundColor: '#e3f0d3' }}>
                <TableSortLabel
                  active={orderBy === 'fourthPlaceScore'}
                  direction={orderBy === 'fourthPlaceScore' ? order : 'asc'}
                  onClick={() => handleRequestSort('fourthPlaceScore')}
                >
                  <strong>점수</strong>
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" sx={{ backgroundColor: '#e3f0d3' }}>
                <TableSortLabel
                  active={orderBy === 'checksum'}
                  direction={orderBy === 'checksum' ? order : 'asc'}
                  onClick={() => handleRequestSort('checksum')}
                >
                  <strong>점수 합</strong>
                </TableSortLabel>
              </TableCell>
              <TableCell align="center" sx={{ backgroundColor: '#e3f0d3' }}>
                <TableSortLabel
                  active={orderBy === 'comment'}
                  direction={orderBy === 'comment' ? order : 'asc'}
                  onClick={() => handleRequestSort('comment')}
                >
                  <strong>특이사항</strong>
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.length > 0 ? (
              sortedData.map((row) => (
                <TableRow
                  key={moment
                    .tz(row.timestamp, 'Asia/Seoul')
                    .format('YYYY년 MM월 DD일 HH시 mm분')}
                >
                  <TableCell component="th" scope="row">
                    {moment
                      .tz(row.timestamp, 'Asia/Seoul')
                      .format('YYYY년 MM월 DD일 HH시 mm분')}
                  </TableCell>
                  <TableCell align="right">{row.firstPlaceName}</TableCell>
                  <TableCell align="right">{row.firstPlaceScore}</TableCell>
                  <TableCell align="right">{row.secondPlaceName}</TableCell>
                  <TableCell align="right">{row.secondPlaceScore}</TableCell>
                  <TableCell align="right">{row.thirdPlaceName}</TableCell>
                  <TableCell align="right">{row.thirdPlaceScore}</TableCell>
                  <TableCell align="right">{row.fourthPlaceName}</TableCell>
                  <TableCell align="right">{row.fourthPlaceScore}</TableCell>
                  <TableCell align="right">{row.checksum}</TableCell>
                  <TableCell align="right">{row.comment}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={11}>
                  <Typography variant="body1" color="textSecondary">
                    데이터가 없습니다.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
