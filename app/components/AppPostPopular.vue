<template>
    <div class="post-popular">
        <p class="post-popular__title">{{ $t('pages.blog.popular') }}</p>

        <div class="post-popular__items">
            <NuxtLink
                class="post-popular__item"
                v-for="(post, i) in popular?.slice(0, 5)"
                :key="post.id"
                :to="navigateToPath(post)"
            >
                <span>0{{ i + 1 }}</span>
                <p>{{ post.title }}</p>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { fetchPosts } from '~/api/posts';
import type { PostQueryParams, Post } from '~/types/posts';

const localePath = useLocalePath();

const params = ref<PostQueryParams>({
    page: 1,
    text: '',
    sort: 'popular',
});

const { data: popular } = useAsyncData<Post[]>('popular-posts', () =>
    fetchPosts(params.value)
        .then((response) => response.data.data)
        .catch(() => [])
);

const navigateToPath = (post: Post) =>
    localePath({ name: 'blog-post', params: { post: post.slug } });
</script>
