import { Metadata } from '@/types/metadata';
import { DataGroup } from '@/types/data';
import { parseISO, format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export function metadataProcess(totalData: DataGroup[]) {
  const metadata: Metadata = {
    totalPlayCount: 0,
    totalPlayerCount: 0,
    totalHighestScore: 30000,
    totalHighestScorePlayer: '',
    totalLowestScore: 30000,
    totalLowestScorePlayer: '',
    totalMostPlayedPlayer: '',
    totalMostPlayedPlayerCount: 0,
    totalMostPlayedDate: new Date(),
    totalMostPlayedDateCount: 0,
  };

  let playCount = 0;
  let highestScore = -2000000;
  let highestScorePlayer = '';
  let lowestScore = 2000000;
  let lowestScorePlayer = '';
  const playerPlayCountMap = new Map();
  const datePlayCountMap = new Map();

  for (let i = 0; i < totalData.length; i++) {
    playCount += 1;
    if (highestScore < totalData[i].firstPlaceScore) {
      highestScore = totalData[i].firstPlaceScore;
      highestScorePlayer = totalData[i].firstPlaceName;
    }
    if (lowestScore > totalData[i].fourthPlaceScore) {
      lowestScore = totalData[i].fourthPlaceScore;
      lowestScorePlayer = totalData[i].fourthPlaceName;
    }
    if (!playerPlayCountMap.has(totalData[i].firstPlaceName)) {
      playerPlayCountMap.set(totalData[i].firstPlaceName, 0);
    }
    if (!playerPlayCountMap.has(totalData[i].secondPlaceName)) {
      playerPlayCountMap.set(totalData[i].secondPlaceName, 0);
    }
    if (!playerPlayCountMap.has(totalData[i].thirdPlaceName)) {
      playerPlayCountMap.set(totalData[i].thirdPlaceName, 0);
    }
    if (!playerPlayCountMap.has(totalData[i].fourthPlaceName)) {
      playerPlayCountMap.set(totalData[i].fourthPlaceName, 0);
    }
    playerPlayCountMap.set(
      totalData[i].firstPlaceName,
      playerPlayCountMap.get(totalData[i].firstPlaceName) + 1
    );
    playerPlayCountMap.set(
      totalData[i].secondPlaceName,
      playerPlayCountMap.get(totalData[i].secondPlaceName) + 1
    );
    playerPlayCountMap.set(
      totalData[i].thirdPlaceName,
      playerPlayCountMap.get(totalData[i].thirdPlaceName) + 1
    );
    playerPlayCountMap.set(
      totalData[i].fourthPlaceName,
      playerPlayCountMap.get(totalData[i].fourthPlaceName) + 1
    );

    const date = parseISO(totalData[i].timestamp.toISOString());
    const zonedDate = toZonedTime(date, 'Asia/Seoul');
    const formattedDate = format(zonedDate, 'yyyy-MM-dd') + ' 00:00:00+09:00';
    if (!datePlayCountMap.has(formattedDate)) {
      datePlayCountMap.set(formattedDate, 0);
    }
    datePlayCountMap.set(formattedDate, datePlayCountMap.get(formattedDate) + 1);
  }

  let mostPlayedPlayer = '';
  let mostPlayedPlayerCount = 0;
  for (const [key, value] of playerPlayCountMap) {
    if (value > mostPlayedPlayerCount) {
      mostPlayedPlayer = key;
      mostPlayedPlayerCount = value;
    }
  }

  let mostPlayedDate = new Date();
  let mostPlayedDateCount = 0;
  for (const [key, value] of datePlayCountMap) {
    if (value > mostPlayedDateCount) {
      mostPlayedDate = new Date(key);
      mostPlayedDateCount = value;
    }
  }

  metadata['totalPlayCount'] = playCount;
  metadata['totalPlayerCount'] = playerPlayCountMap.size;
  metadata['totalHighestScore'] = highestScore;
  metadata['totalHighestScorePlayer'] = highestScorePlayer;
  metadata['totalLowestScore'] = lowestScore;
  metadata['totalLowestScorePlayer'] = lowestScorePlayer;
  metadata['totalMostPlayedPlayer'] = mostPlayedPlayer;
  metadata['totalMostPlayedPlayerCount'] = mostPlayedPlayerCount;
  metadata['totalMostPlayedDate'] = mostPlayedDate;
  metadata['totalMostPlayedDateCount'] = mostPlayedDateCount;

  return metadata;
}
