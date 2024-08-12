/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDateTime } from './LocalDateTime';

export type OAuth2Token = {
    token_type: string;
    access_token: string;
    refresh_token: string;
    scope: string;
    grant_time: LocalDateTime;
    expires_in?: number;
    refresh_expires_in?: number;
};

