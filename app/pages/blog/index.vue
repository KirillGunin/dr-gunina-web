<template>
    <div class="page-blog">
        <div class="container">
            <AppBreadcrumb :breadcrumbs="breadcrumbs" />

            <div class="page-blog__content">
                <!--header-->
                <div class="page-blog__header">
                    <AppHeading level="1" size="lg" :subheading="$t('pages.blog.subtitle')">
                        {{ $t('pages.blog.title') }}
                    </AppHeading>

                    <AppSearch
                        class="page-blog__header-search"
                        size="sm"
                        rounded
                        :placeholder="$t('pages.blog.search-placeholder')"
                        @search="(text) => updateQueryParams({ sort: '', text })"
                        @clear="updateQueryParams({ sort: '', text: '' })"
                    />
                </div>

                <!--sorting-->
                <div class="page-blog__sorting">
                    <AppSelect
                        class="page-blog__sorting-select"
                        :model-value="params.sort"
                        :placeholder="`${$t('pages.blog.sorting')} ${$t('pages.blog.posts-count', { count: meta?.total })}`"
                        option-value="value"
                        option-label="label"
                        :options="sortingValues"
                        @update:model-value="
                            (sort) => updateQueryParams({ sort: sort as PostQueryParams['sort'] })
                        "
                    />
                </div>

                <!--aside-->
                <div class="page-blog__aside">
                    <AppPostPopular class="page-blog__popular" />

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

                <!--posts-->
                <div class="page-blog__posts">
                    <template v-if="pending && !posts.length">
                        <AppSkeletonPostPreview v-for="n in 6" :key="n" />
                    </template>

                    <template v-else>
                        <AppPostPreview v-for="post in posts" :key="post.id" :post="post" />
                    </template>
                </div>

                <div class="page-blog__posts-control">
                    <AppButton
                        v-if="meta && meta.currentPage < meta.lastPage"
                        :pt="{
                            root: {
                                style: {
                                    width: '100%',
                                },
                            },
                        }"
                        variant="outlined"
                        rounded
                        raised
                        :disabled="loading"
                        @click="loadMore"
                    >
                        <i class="pi pi-ellipsis-h"></i>
                        {{ $t('pages.blog.load-more') }}
                    </AppButton>
                </div>
            </div>

            <AppReviews class="page-blog__reviews" />
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
import { useCookieAgreement } from '~/composables/useCookieAgreement';
import { fetchPosts } from '~/api/posts';
import type { AxiosResponse } from 'axios';
import type { PostQueryParams, PostsResponse, Meta, Post } from '~/types/posts';

import AppHeading from '~/components/AppHeading.vue';
import AppReviews from '~/components/AppReviews.vue';
import AppSkeletonPostPreview from '~/components/skeletons/AppSkeletonPostPreview.vue';
import AppPostPopular from '~/components/AppPostPopular.vue';
import AppBreadcrumb from '~/components/AppBreadcrumb.vue';
import { useSeoBlog } from '~/composables/seo-blog';
import { computed } from 'vue';

const { t } = useI18n();

useSeoBlog();

const toast = useToast();
const modalAppointment = ref<boolean>(false);
const loading = ref<boolean>(false);
const params = ref<PostQueryParams>({
    page: 1,
    text: '',
    sort: '',
});

const successAppointment = (response: AxiosResponse) => {
    const message = response.data.message;
    toast.add({ severity: 'success', summary: message.label, detail: message.text, life: 6000 });
    useCookieAgreement().setAgreement('accept');
    modalAppointment.value = false;
};

const sortingValues = [
    { value: 'new', label: t('pages.blog.sorting-new') },
    { value: 'old', label: t('pages.blog.sorting-old') },
    { value: 'popular', label: t('pages.blog.sorting-popular') },
];

const { data: initialPostsResponse, pending } = await useAsyncData('all-posts', () =>
    fetchPosts(params.value).then((res) => res.data as PostsResponse)
);

const posts = useState<Post[]>('blog-posts', () => initialPostsResponse.value?.data ?? []);
const meta = useState<Meta | null>('blog-meta', () => initialPostsResponse.value?.meta ?? null);

const loadPosts = async (reset: boolean) => {
    loading.value = true;

    try {
        const response = await fetchPosts(params.value).then((res) => res.data as PostsResponse);

        posts.value = reset ? response.data : [...posts.value, ...response.data];
        meta.value = response.meta;
    } finally {
        loading.value = false;
    }
};

const loadMore = () => {
    params.value.page += 1;
    loadPosts(false);
};

const updateQueryParams = (patch: Partial<Pick<PostQueryParams, 'sort' | 'text'>>) => {
    params.value = { ...params.value, ...patch, page: 1 };
    loadPosts(true);
};

const breadcrumbs = computed(() => [{ label: t('pages.blog.title') }]);
</script>
