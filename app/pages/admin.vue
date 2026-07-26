<template>
    <div class="page-admin">
        <div class="page-admin__content">
            <div class="page-admin__header">
                <h1>{{ $t('pages.admin.welcome', { name: admin?.name }) }}</h1>

                <AppButton
                    variant="outlined"
                    severity="danger"
                    rounded
                    raised
                    @click="logoutRequest()"
                >
                    <i class="pi pi-sign-out"></i>

                    {{ $t('pages.admin.logout') }}
                </AppButton>
            </div>

            <Tabs :value="route.path">
                <TabList
                    :pt="{
                        root: {
                            style: {
                                borderRadius: '20px 20px 0 0',
                            },
                        },
                    }"
                >
                    <Tab v-for="tab in tabs" :key="tab.path" as="div" :value="tab.path">
                        <NuxtLink :to="tab.path">{{ tab.title }}</NuxtLink>
                    </Tab>
                </TabList>
            </Tabs>

            <NuxtPage />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useI18n } from '#imports';
import { useAuth } from '~/stores/auth';
import { logoutRequest } from '~/api/auth';

definePageMeta({ layout: 'admin' });

const route = useRoute();
const { t } = useI18n();

const admin = computed(() => useAuth().user);

const tabs = computed(() => [
    { title: t('tabs.dashboard'), path: '/admin/dashboard' },
    { title: t('tabs.reviews-pending'), path: '/admin/reviews-pending' },
    { title: t('tabs.reviews-all'), path: '/admin/reviews-all' },
]);
</script>
