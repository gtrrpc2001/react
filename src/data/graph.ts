import {
  getData,
  getEcg,
  getEcgIdx,
  getEcgTemp,
  getEcgTime,
  getGraphBpmHrvArr,
  getGraphEcg,
  getProfile,
} from "../axios/api/serverApi";
import { graphBpmHrvArr } from "../axios/interface/graph";

export const getGraphBpmHrvArrData = async (
  eq: string,
  nowTime: string,
  time: string[]
): Promise<graphBpmHrvArr[]> => {
  const data: graphBpmHrvArr[] = await getGraphBpmHrvArr(
    `/mslbpm/webGraphBpmHrvArr?eq=${eq}&startDate=${nowTime}&endDate=${time[1]}&name=`
  );
  return data;
};

export const getGraphEcgTime = async (
  eq: string,
  nowTime: string,
  time: string[]
): Promise<any[]> => {
  const data: any[] = await getEcgTime(
    `/mslecgbyte/EcgTime?eq=${eq}&startDate=${nowTime}&endDate=${time[1]}&name=`
  );
  return data;
};

export const getGraphEcgValue = async (
  eq: string,
  startTime: string,
  endTime: string
): Promise<{ ecg: number[]; writetime: string }[]> => {
  const data = getGraphEcg(
    `/mslecgbyte/GraphEcg?eq=${eq}&startDate=${startTime}&endDate=${endTime}&name=`
  );
  return data;
};

export const getManagerCheck = async (email: string): Promise<boolean> => {
  const data: any = await getData(`/msl/managerCheck?empid=${email}&name=`);
  return data;
};

export const GetProfile = async (eq: string) => {
  const profile = await getProfile(`/mslecgarr/arrCnt?eq=${eq}&name=`);
  return profile;
}

export const GetEcg = async (eq: string, startDate: string) => {
  const result = await getEcg(`/mslecgbyte/Ecg?eq=${eq}&startDate=${startDate}&name=`);
  return result
}

export const GetEcgTemp = async (eq: string, startIdx: number) => {
  const result = await getEcgTemp(`/mslecgbyte/EcgTemp?eq=${eq}&startIdx=${startIdx}&name=`);
  return result
}

export const GetEcgIdx = async (eq: string) => {
  const result = await getEcgIdx(`/mslecgbyte/EcgIdx?eq=${eq}&name=`)
  return result
}