<template>
    <div class="post-preview" :class="{ 'post-preview--has-image': post.media[0]?.url }">
        <NuxtLink v-if="post.media[0]?.url" class="post-preview__media" :to="navigateToPath">
            <NuxtImg
                :src="post.media[0].url"
                :alt="post.title"
                format="webp"
                loading="lazy"
                width="460"
                height="300"
                sizes="767:100vw 768:360px"
            />
        </NuxtLink>

        <div class="post-preview__content">
            <span class="post-preview__date">{{ formatDate(post.date) }}</span>

            <NuxtLink :to="navigateToPath">
                <h2 class="post-preview__title">{{ post.title }}</h2>
            </NuxtLink>

            <p class="post-preview__description">
                {{ post.text }}
            </p>

            <div class="post-preview__socials"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { formatDate } from '~/utils/formatTime';

const props = defineProps<{
    post: any;
}>();

const localePath = useLocalePath();

const navigateToPath = computed(() =>
    localePath({ name: 'blog-post', params: { post: props.post.slug } })
);
</script>
