import { Key } from "react";
import { memberStatus, memberType } from "../enums/member.enum";

export interface Member {
    _id: Key | null | undefined;
    memberType: memberType;
    memberStatus: memberStatus
    memberNick: string;
    memberPassword: string;
    memberPhone: string;
    memberAddress?: string;
    memberDesc?: string;
    memberImage?: string;
    memberPoints: number;
    createAt: Date;
    updateAT: string;
}

export interface MemberInput {
    memberType?: memberType;
    memberStatus?: memberStatus
    memberNick: string;
    memberPassword: string;
    memberPhone: string;
    memberAddress?: string;
    memberDesc?: string;
    memberImage?: string;
    memberPoints?: number;

}

export interface MemberUpdateInput {
    memberStatus?: memberStatus;
    memberNick?: string;
    memberPhone?: string;
    memberAddress?: string;
    memberDesc?: string;
    memberImage?: string | any;
    memberPoints?: number;
}

export interface LoginInput{
    memberNick: string;
    memberPassword: string;
}