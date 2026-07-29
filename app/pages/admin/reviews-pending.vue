<template>
    <div class="page-reviews-pending">
        <div class="page-reviews-pending__table">
            <DataTable
                v-model:expandedRows="expandedRows"
                :value="pendingReviews"
                :loading="loading || patchingReview"
                dataKey="id"
                tableStyle="min-width: 50rem"
                scrollable
                scrollHeight="flex"
            >
                <Column expander style="width: 5rem" />

                <Column :header="$t('reviews-table.column-user')">
                    <template #body="slotProps">
                        {{ slotProps.data.name }} {{ slotProps.data.last_name }}
                    </template>
                </Column>

                <Column :header="$t('reviews-table.column-phone')">
                    <template #body="slotProps">
                        {{ formatPhone(slotProps.data.phone) }}
                    </template>
                </Column>

                <Column :header="$t('reviews-table.column-created-at')">
                    <template #body="slotProps">
                        {{ formatDate(slotProps.data.created_at) }}
                    </template>
                </Column>

                <Column :header="$t('reviews-table.column-rating')">
                    <template #body="slotProps">
                        <AppRating
                            :model-value="slotProps.data.rating"
                            readonly
                            :pt="{
                                root: {
                                    style: {
                                        gap: '4px',
                                    },
                                },
                                onIcon: {
                                    style: {
                                        color: 'var(--p-gold-300)',
                                        width: '20px',
                                        height: '20px',
                                    },
                                },
                                offIcon: {
                                    style: {
                                        color: 'var(--p-gold-300)',
                                        width: '20px',
                                        height: '20px',
                                    },
                                },
                            }"
                        />
                    </template>
                </Column>

                <Column :header="$t('reviews-table.column-actions')">
                    <template #body="slotProps">
                        <div class="page-admin__reviews-table-actions">
                            <AppButton
                                severity="success"
                                size="small"
                                rounded
                                raised
                                :pt="{
                                    root: {
                                        style: {
                                            width: '39px',
                                            height: '39px',
                                        },
                                    },
                                }"
                                @click="confirmReview(slotProps.data.id)"
                            >
                                <i class="pi pi-check"></i>
                            </AppButton>

                            <AppButton
                                severity="danger"
                                size="small"
                                rounded
                                raised
                                :pt="{
                                    root: {
                                        style: {
                                            width: '39px',
                                            height: '39px',
                                        },
                                    },
                                }"
                                @click="declineReview(slotProps.data.id)"
                            >
                                <i class="pi pi-times"></i>
                            </AppButton>
                        </div>
                    </template>
                </Column>

                <template #expansion="slotProps">
                    <h4 class="page-admin__reviews-table-review-title">
                        {{ $t('reviews-table.review-text-title') }}
                    </h4>
                    <span>{{ slotProps.data.text }}</span>
                </template>

                <template v-if="!pendingReviews.length && !loading" #empty>
                    {{ $t('reviews-table.empty-pending') }}
                </template>
            </DataTable>
        </div>
    </div>
</template>
<script setup lang="ts">
import { formatPhone } from '~/utils/formatPhone';
import { formatDate } from '~/utils/formatTime';
import { approvePendingReviews, fetchPendingReviews, rejectPendingReviews } from '~/api/reviews';
import type { Review } from '~/types/reviews';
import type { DataTableExpandedRows } from 'primevue/datatable';
import type { AxiosError, AxiosResponse } from 'axios';

const toast = useToast();

const loading = ref<boolean>(false);
const pendingReviews = ref<Review[]>([]);
const expandedRows = ref<DataTableExpandedRows>({});
const patchingReview = ref<boolean>(false);

const loadPendingReview = () => {
    loading.value = true;

    fetchPendingReviews()
        .then((response) => (pendingReviews.value = response.data.data))
        .catch((error: AxiosError) => {
            const message = error.message;
            toast.add({ severity: 'error', summary: message, life: 6000 });
        })
        .finally(() => {
            loading.value = false;
            patchingReview.value = false;
        });
};

const confirmReview = (id: string) => {
    patchingReview.value = true;

    approvePendingReviews(id)
        .then((response: AxiosResponse) => {
            const message = response?.data?.message;
            toast.add({ severity: 'success', summary: message, life: 6000 });
            loadPendingReview();
        })
        .catch((error: AxiosError) => {
            const message = error?.message;
            toast.add({ severity: 'error', summary: message, life: 6000 });
        });
};

const declineReview = (id: string) => {
    patchingReview.value = true;

    rejectPendingReviews(id)
        .then((response: AxiosResponse) => {
            const message = response?.data?.message;
            toast.add({ severity: 'success', summary: message, life: 6000 });
            loadPendingReview();
        })
        .catch((error: AxiosError) => {
            const message = error?.message;
            toast.add({ severity: 'error', summary: message, life: 6000 });
        });
};

loadPendingReview();
</script>
