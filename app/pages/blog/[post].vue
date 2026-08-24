<template>
    <div class="page-post">
        <div class="container">
            <AppBreadcrumb :breadcrumbs="breadcrumbs" />

            <div v-if="post" class="page-post__content">
                <!--header-->
                <div class="page-post__header">
                    <AppHeading level="1" size="lg" :subheading="post.subtitle">
                        {{ post.title }}
                    </AppHeading>
                </div>

                <!--aside-->
                <div class="page-post__aside">
                    <!--popular-->
                    <AppPostPopular class="page-blog__popular" />

                    <!--appointment-->
                    <div class="page-blog__appointment">
                        <p class="page-blog__appointment-title">{{ $t('pages.blog.questions') }}</p>
                        <span class="page-blog__appointment-description">
                            {{ $t('pages.blog.questions-description') }}
                        </span>

                        <AppButton
                            :label="$t('pages.blog.questions-cta')"
                            rounded
                            raised
                            severity="success"
                            @click="modalAppointment = true"
                        />
                    </div>
                </div>

                <!--post-->
                <div class="page-post__post">
                    <AppPostCarousel
                        v-if="post.media.length"
                        class="page-post__carousel"
                        :posts="post.media"
                    />

                    <div
                        class="page-post__text"
                        v-html="DOMPurify.sanitize(post.html, { ADD_ATTR: ['target'] })"
                    ></div>

                    <div class="page-post__content-footer">
                        <span class="page-post__content-footer-date">
                            {{ $t('pages.blog.published') }}: {{ formatDate(post.date) }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <Transition :duration="300">
            <LazyModalsModalAppointment
                v-if="modalAppointment"
                :visible="modalAppointment"
                @close:visible="modalAppointment = false"
                @success:appointment="(response) => successAppointment(response)"
            />
        </Transition>
    </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { fetchPost } from '~/api/posts';
import { useCookieAgreement } from '~/composables/useCookieAgreement';
import { formatDate } from '~/utils/formatTime';
import DOMPurify from 'isomorphic-dompurify';
import type { AxiosResponse } from 'axios';
import type { Post } from '~/types/posts';

import AppHeading from '~/components/AppHeading.vue';
import AppPostPopular from '~/components/AppPostPopular.vue';
import AppPostCarousel from '~/components/AppPostCarousel.vue';
import AppBreadcrumb from '~/components/AppBreadcrumb.vue';
import { useSeoPost } from '~/composables/seo-post';

const toast = useToast();
const route = useRoute();
const nuxtApp = useNuxtApp();
const { t } = useI18n();

const modalAppointment = ref<boolean>(false);

const { data: post, pending } = await useAsyncData<Post | null>(
    `page-post-${route.params.post}`,
    () =>
        fetchPost(route.params.post as string)
            .then((response) => response.data.data)
            .catch(() => null),
    { watch: [() => route.params.post] }
);

useSeoPost(post);

if (post.value === null) {
    nuxtApp.runWithContext(() => {
        throw createError({
            statusCode: 404,
            message: t('services.errors.service-not-found'),
            fatal: true,
        });
    });
}

const successAppointment = (response: AxiosResponse) => {
    const message = response.data.message;
    toast.add({ severity: 'success', summary: message.label, detail: message.text, life: 6000 });
    useCookieAgreement().setAgreement('accept');
    modalAppointment.value = false;
};

const breadcrumbs = computed(() => [
    { label: t('pages.blog.title'), url: '/blog' },
    { label: post?.value?.title },
]);
</script>
