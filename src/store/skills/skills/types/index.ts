import { Skill } from "../../../../utils";

export interface initialStateSkills {
    data: Skill[],
    loading: boolean,
    error: string | null,
    totalCount: number
}

export interface SkillParams {
    skip: number
    take: number
    skillType?: string
}