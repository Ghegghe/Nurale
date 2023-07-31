import { Job } from "../../../../utils";

export interface initialStateJobs {
    data: Job[],
    loading: boolean,
    error: string | null,
    totalCount: number
}
export interface JobsParams {
    skip: number,
    take: number,
}