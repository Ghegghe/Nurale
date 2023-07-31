import { Job } from "../../../../utils";

export interface InitialStateJob {
    data: Job | null,
    loading: boolean,
    error: string | null,
    pagination: number
}