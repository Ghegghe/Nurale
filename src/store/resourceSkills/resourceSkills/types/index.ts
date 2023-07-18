import { ResourceSkill } from "../../../../utils";

export interface initialStateResourceSkills {
    data: ResourceSkill[],
    loading: boolean,
    error: string | null,
    totalCount: number
}

export interface ResourceSkillsParams {
    skip: number
    take: number
    resourceId?: number,
    skillId?: number,
    level?: number
}