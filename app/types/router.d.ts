import type { User } from '~/types/user';

declare module 'vue-router' {
    interface RouteMeta {
        requiredRole?: User['role'];
    }
}

export {};
