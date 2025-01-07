import {
  getDataResponse,
  getGraphArr,
  getGraphBpm,
  getGraphCalStep,
  getStress,
  getOnlyArr
} from "../../../../axios/api/serverApi";
import { yesterdayArr } from "../../../../axios/interface/arr";
import {
  graphBpm,
  graphCalStep,
  graphPulse,
} from "../../../../axios/interface/graphModal";

export const getBpm = async (
  eq: string,
  startDate: string,
  endDate: string,
  stressCheck: boolean = false
): Promise<graphBpm[]> => {
  let result: graphBpm[] = []
  if (stressCheck) {
    const data = await getStress(
      `/mslecgstress/ecgStressData?eq=${eq}&startDate=${startDate}&endDate=${endDate}&name=`
    );
    data.forEach((value, _index) => {
      const { pns_percent, sns_percent, writetime } = value
      result.push({ stress: { sns: sns_percent, pns: pns_percent }, bpm: 0, hrv: 0, writetime: writetime })
    })
  } else {
    result = await getGraphBpm(
      `/mslbpm/webBpm?eq=${eq}&startDate=${startDate}&endDate=${endDate}&name=`
    );
  }
  return result;
};

export const getArr = async (
  eq: string,
  startDate: string,
  endDate: string,
  len: number
): Promise<graphPulse[]> => {
  const result = await getGraphArr(
    `/mslecgarr/graphArrCnt?eq=${eq}&startDate=${startDate}&endDate=${endDate}&len=${len}&name=`
  );
  return result;
};

export const getCalStep = async (
  eq: string,
  startDate: string,
  endDate: string,
  len: number
): Promise<graphCalStep[]> => {
  const result = await getGraphCalStep(
    `/mslecgday/webDay?eq=${eq}&startDate=${startDate}&endDate=${endDate}&len=${len}&name=`
  );
  return result;
};

export const getWritetimeList = async (
  eq: string,
  startDate: string,
  endDate: string
): Promise<any[]> => {
  const result: any[] = await getDataResponse(
    `/mslecgarr/arrWritetime?eq=${eq}&startDate=${startDate}&endDate=${endDate}&name=`
  );
  return result;
};

export const getArrEcgList = async (
  eq: string,
  startDate: string
): Promise<string[]> => {
  const result: string[] = await getDataResponse(
    `/mslecgarr/arrWritetime?eq=${eq}&startDate=${startDate}&endDate=&name=`
  );
  return result;
};

export const GetOnlyArr = async (
  eq: string,
  startDate: string,
  endDate: string
): Promise<yesterdayArr> => {
  const result: yesterdayArr = await getOnlyArr(
    `mslecgarr/arrCount?eq=${eq}&startDate=${startDate}&endDate=${endDate}&name=`
  );
  return result;
};


