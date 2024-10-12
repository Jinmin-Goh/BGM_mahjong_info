"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper
} from "@mui/material";
import { format } from 'date-fns';
import { DataGroup } from '@/types/data';

interface MainDataTableProps {
  data: DataGroup[];
}

type Order = 'asc' | 'desc';

export default function MainDataTable({ data }: MainDataTableProps) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof DataGroup>('timestamp');

  const handleRequestSort = (property: keyof DataGroup) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, order, orderBy]);

  return (
    <TableContainer component={Paper} style={{ marginTop: "20px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'timestamp'}
                direction={orderBy === 'timestamp' ? order : 'asc'}
                onClick={() => handleRequestSort('timestamp')}
              >
                <strong>대국 시간</strong>
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">
              <TableSortLabel
                active={orderBy === 'first_place_name'}
                direction={orderBy === 'first_place_name' ? order : 'asc'}
                onClick={() => handleRequestSort('first_place_name')}
              >
                <strong>1위</strong>
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === 'first_place_score'}
                direction={orderBy === 'first_place_score' ? order : 'asc'}
                onClick={() => handleRequestSort('first_place_score')}
              >
                <strong>점수</strong>
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">
              <TableSortLabel
                active={orderBy === 'second_place_name'}
                direction={orderBy === 'second_place_name' ? order : 'asc'}
                onClick={() => handleRequestSort('second_place_name')}
              >
                <strong>2위</strong>
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === 'second_place_score'}
                direction={orderBy === 'second_place_score' ? order : 'asc'}
                onClick={() => handleRequestSort('second_place_score')}
              >
                <strong>점수</strong>
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">
              <TableSortLabel
                active={orderBy === 'third_place_name'}
                direction={orderBy === 'third_place_name' ? order : 'asc'}
                onClick={() => handleRequestSort('third_place_name')}
              >
                <strong>3위</strong>
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === 'third_place_score'}
                direction={orderBy === 'third_place_score' ? order : 'asc'}
                onClick={() => handleRequestSort('third_place_score')}
              >
                <strong>점수</strong>
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">
              <TableSortLabel
                active={orderBy === 'fourth_place_name'}
                direction={orderBy === 'fourth_place_name' ? order : 'asc'}
                onClick={() => handleRequestSort('fourth_place_name')}
              >
                <strong>4위</strong>
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === 'fourth_place_score'}
                direction={orderBy === 'fourth_place_score' ? order : 'asc'}
                onClick={() => handleRequestSort('fourth_place_score')}
              >
                <strong>점수</strong>
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === 'checksum'}
                direction={orderBy === 'checksum' ? order : 'asc'}
                onClick={() => handleRequestSort('checksum')}
              >
                <strong>점수 합</strong>
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">
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
          {sortedData.map((row) => (
            <TableRow key={row.timestamp}>
              <TableCell component="th" scope="row">{format(row.timestamp, "yyyy-MM-dd HH:mm:ss")}</TableCell>
              <TableCell align="center">{row.first_place_name}</TableCell>
              <TableCell align="right">{row.first_place_score}</TableCell>
              <TableCell align="center">{row.second_place_name}</TableCell>
              <TableCell align="right">{row.second_place_score}</TableCell>
              <TableCell align="center">{row.third_place_name}</TableCell>
              <TableCell align="right">{row.third_place_score}</TableCell>
              <TableCell align="center">{row.fourth_place_name}</TableCell>
              <TableCell align="right">{row.fourth_place_score}</TableCell>
              <TableCell align="right">{row.checksum}</TableCell>
              <TableCell align="right">{row.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}