import { Resource } from "../../../../utils";

export interface initialStateResources {
    data: Resource[],
    loading: boolean,
    error: string | null,
    totalCount: number
}
export interface ResourcesParams {
    skip?: number
    take?: number
    supplierId?: number,
    hasCV?: boolean
}