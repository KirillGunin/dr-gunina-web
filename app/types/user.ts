export type User = {
    id: string;
    name: string;
    last_name: string;
    email: string;
    role: 'admin' | 'user';
};
