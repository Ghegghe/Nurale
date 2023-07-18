import { User } from "../../../../utils";

export interface initialStateUsers {
    data: User[],
    loading: boolean,
    error: string | null,
    totalCount: number
}