import { getGraphBpm } from "../../../../axios/api/serverApi"
import { graphBpm } from "../../../../axios/interface/graphModal"

export const getBpm = async(eq:string):Promise<graphBpm[]> => {
    const result = await getGraphBpm(`/mslbpm/webBpm?eq=${eq}&startDate=${'2023-11-02'}&endDate=${'2023-11-03'}`)
    return result
}