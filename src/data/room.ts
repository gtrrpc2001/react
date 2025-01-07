import { getHistory, getProfile } from "../axios/api/serverApi";

export const GetProfile = async (eq: string, startDate: string, endDate: string,) => {
    const result = await getProfile(
        `/mslecgarr/arrCnt?eq=${eq}&startDate=${startDate}&endDate=${endDate}&name=`
    );
    return result
}

export const GetHistory = async (eq: string) => {
    const result = await getHistory(`/mslLast/webTable?eq=${eq}&name=`)
    return result
}
