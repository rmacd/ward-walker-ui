/* tslint:disable */
/* eslint-disable */

export interface CognitoProfileDTO {
    id?: string;
    verified?: boolean;
    nhs?: boolean;
}

export interface VersionDTO {
    timestamp?: string;
    version?: string;
    profile?: string;
}

export interface VerifyNHSEmailResponseDTO {
    sent?: boolean | null;
    sentDT?: Date;
}

export interface VerifyEmailReqDTO {
    email?: string;
}

export interface MarkerDTO {
    siteId?: string;
    count?: number;
    lat?: number;
    lng?: number;
    name?: string;
    type?: MarkerTypeEnum;
    status?: MarkerStatusEnum;
}

export interface UserProfileDTO {
    cognitoId?: string;
    nickname?: string;
    permitEmail?: boolean;
}

export interface HealthBoardDTO {
    hbId?: string;
    name?: string;
}

export enum MarkerTypeEnum {
    SINGLE = "SINGLE",
    CLUSTER = "CLUSTER",
}

export enum MarkerStatusEnum {
    GREY = "GREY",
    RED = "RED",
    AMBER = "AMBER",
    GREEN = "GREEN",
}
