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

export interface UserProfileDTO {
    cognitoId?: string | null;
    nickname?: string | null;
    healthBoardId?: string | null;
    healthBoardName?: string | null;
    permitEmail?: boolean;
}

export interface HealthBoardDTO {
    hbId?: string;
    name?: string;
}

export interface SiteDTO {
    siteId?: string;
    name?: string;
    wards?: WardDTO[] | null;
}

export interface WardDTO {
    code?: string;
    name?: string;
}
