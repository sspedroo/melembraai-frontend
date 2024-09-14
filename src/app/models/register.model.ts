export interface Register {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegisterResponse {
    id: string;
    name: string;
    email: string;
    isActive: boolean;
    isVerified: boolean;
    firstLogin: boolean;
    role: string;
    createAt: string;
    updatedAt: string;
    lastActivityDate: string;
}

export interface ConfirmEmail {
    userId: string;
    token: string;
}