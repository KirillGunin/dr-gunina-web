import { useAuth } from '~/stores/auth';

export default defineNuxtRouteMiddleware(async (to) => {
    if (to.meta.layout !== 'admin') {
        return;
    }

    const auth = useAuth();

    if (!auth.user) {
        try {
            await auth.me();
        } catch {
            return navigateTo('/');
        }
    }

    const requiredRole = to.meta.requiredRole ?? 'admin';

    if (!auth.hasRole(requiredRole)) {
        return navigateTo('/');
    }
});
