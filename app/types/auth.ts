import type { User } from '~/types/user';

export type LoginPayload = {
    email: string;
    password: string;
};

export interface LoginErrorResponse {
    message: string;
    errors?: {
        email?: string[];
        password?: string[];
    };
}

export type LoginResponse = {
    access_token: string;
    user: User;
};

export type RefreshResponse = {
    access_token: string;
};
