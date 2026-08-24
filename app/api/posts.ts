import { filterParams } from '~/composables/useHelpers';
import type { PostQueryParams } from '~/types/posts';

export const fetchPosts = async (params: Partial<PostQueryParams>) => {
    const { $axios } = useNuxtApp();

    return await $axios
        .get('/posts', { params: filterParams(params) })
        .then((response) => Promise.resolve(response))
        .catch((error) => Promise.reject(error));
};

export const fetchPost = async (slug: string) => {
    const { $axios } = useNuxtApp();

    return await $axios
        .get(`/posts/${slug}`)
        .then((response) => Promise.resolve(response))
        .catch((error) => Promise.reject(error));
};
