import { UserData } from '@/types/userData';
import { DataGroup } from '@/types/data';

export function userDataProcess(totalData: DataGroup[]) {
  const userDataMap = new Map<string, Partial<UserData>>();
  for (let i = 0; i < totalData.length; i++) {
    const userNames = [
      totalData[i].firstPlaceName,
      totalData[i].secondPlaceName,
      totalData[i].thirdPlaceName,
      totalData[i].fourthPlaceName,
    ];

    userNames.forEach((name) => {
      if (!userDataMap.has(name)) {
        userDataMap.set(name, { userName: name } as Partial<UserData>);
      }
    });
  }
}
