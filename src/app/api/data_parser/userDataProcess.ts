import { UserData } from '@/types/userData';
import { DataGroup } from '@/types/data';

export function userDataProcess(totalData: DataGroup[]) {
  const userDataMap = new Map<string, UserData>();
  for (let i = 0; i < totalData.length; i++) {
    const userNames = [
      totalData[i].firstPlaceName,
      totalData[i].secondPlaceName,
      totalData[i].thirdPlaceName,
      totalData[i].fourthPlaceName,
    ];
    const userScores = [
      totalData[i].firstPlaceScore,
      totalData[i].secondPlaceScore,
      totalData[i].thirdPlaceScore,
      totalData[i].fourthPlaceScore,
    ];
    const uma = [20, 10, -10, -20];

    userNames.forEach((name, idx) => {
      const userData: UserData =
        userDataMap.get(name) ||
        ({
          userName: name,
          currentPlace: 0,
          totalUma: 0.0,
          averageUma: 0.0,
          totalPlayCount: 0,
          totalScoreSum: 0,
          averageGainedScore: 0,
          firstPlaceRate: 0.0,
          secondPlaceRate: 0.0,
          thirdPlaceRate: 0.0,
          fourthPlaceRate: 0.0,
          tobiRate: 0.0,
          averagePlace: 0.0,
          firstPlaceCount: 0,
          secondPlaceCount: 0,
          thirdPlaceCount: 0,
          fourthPlaceCount: 0,
          tobiCount: 0,
          firstPlayDate: new Date(),
          recentPlayDate: new Date('2024-06-18T00:00:00.000Z'),
          userHighestScore: 0,
          userLowestScore: 0,
        } as UserData);
      userData.totalPlayCount += 1;
      userData.totalUma += (userScores[idx] - 30000) / 1000 + uma[idx];
      userData.averageUma =
        Math.round((userData.totalUma / userData.totalPlayCount) * 100) / 100;
      userData.totalScoreSum += userScores[idx];
      userData.averageGainedScore = Math.round(
        (userData.totalScoreSum - 30000 * userData.totalPlayCount) /
          userData.totalPlayCount
      );
      if (idx === 0) {
        userData.firstPlaceCount += 1;
      }
      if (idx === 1) {
        userData.secondPlaceCount += 1;
      }
      if (idx === 2) {
        userData.thirdPlaceCount += 1;
      }
      if (idx === 3) {
        userData.fourthPlaceCount += 1;
      }
      if (userScores[idx] < 0) {
        userData.tobiCount += 1;
      }
      userData.firstPlaceRate =
        Math.round(
          (userData.firstPlaceCount / userData.totalPlayCount) * 10000
        ) / 10000;
      userData.secondPlaceRate =
        Math.round(
          (userData.secondPlaceCount / userData.totalPlayCount) * 10000
        ) / 10000;
      userData.thirdPlaceRate =
        Math.round(
          (userData.thirdPlaceCount / userData.totalPlayCount) * 10000
        ) / 10000;
      userData.fourthPlaceRate =
        Math.round(
          (userData.fourthPlaceCount / userData.totalPlayCount) * 10000
        ) / 10000;
      userData.tobiRate =
        Math.round((userData.tobiCount / userData.totalPlayCount) * 10000) /
        10000;
      userData.averagePlace =
        Math.round(
          ((1 * userData.firstPlaceCount +
            2 * userData.secondPlaceCount +
            3 * userData.thirdPlaceCount +
            4 * userData.fourthPlaceCount) /
            userData.totalPlayCount) *
            100
        ) / 100;
      if (userData.firstPlayDate > totalData[i].timestamp) {
        userData.firstPlayDate = totalData[i].timestamp;
      }
      if (userData.recentPlayDate < totalData[i].timestamp) {
        userData.recentPlayDate = totalData[i].timestamp;
      }
      userData.userHighestScore = Math.max(
        userData.userHighestScore,
        userScores[idx]
      );
      userData.userLowestScore = Math.min(
        userData.userLowestScore,
        userScores[idx]
      );

      userDataMap.set(name, userData);
    });
  }

  const umaList: [string, number][] = Array.from(userDataMap.values()).map(
    (userData: UserData) => {
      return [userData.userName, userData.totalUma];
    }
  );
  const sortedUmaList: [string, number][] = [...umaList].sort(
    (a, b) => b[1] - a[1]
  );

  sortedUmaList.forEach(([name, ], idx) => {
    const userData = userDataMap.get(name)!;
    userData.currentPlace = idx + 1;
    userDataMap.set(name, userData);
  });

  console.log(userDataMap);
}
