import { Skill } from "../../../../utils";

export interface initialStateSkills {
    data: Skill[],
    loading: boolean,
    error: string | null,
    pagination: number
}