<template>
    <div class="post-carousel">
        <Carousel
            :value="posts"
            :num-visible="1"
            :num-scroll="1"
            :show-navigators="false"
            :show-indicators="posts.length > 1"
        >
            <template #item="slotProps">
                <NuxtImg
                    class="post-carousel__image"
                    :src="slotProps.data.url"
                    :alt="slotProps.data.alt ?? ''"
                    format="webp"
                    loading="lazy"
                    width="400"
                    height="500"
                    sizes="767:100vw 768:360px"
                />
            </template>
        </Carousel>
    </div>
</template>

<script setup lang="ts">
import type { PostMedia } from '~/types/posts';

defineProps<{
    posts: PostMedia[];
}>();
</script>
