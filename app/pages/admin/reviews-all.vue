<template>
    <div class="page-reviews-approved">
        <div class="page-reviews-approved__table">
            <DataTable
                v-model:expandedRows="expandedRows"
                :value="approvedReviews"
                :loading="loading"
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
                                @click="removeReview(slotProps.data.id)"
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
            </DataTable>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { deleteReview, fetchApprovedReviews } from '~/api/reviews';
import { formatPhone } from '~/utils/formatPhone';
import { formatDate } from '~/utils/formatTime';
import type { Review } from '~/types/reviews';
import type { AxiosError } from 'axios';
import type { DataTableExpandedRows } from 'primevue/datatable';

const toast = useToast();

const loading = ref<boolean>(false);
const removing = ref<boolean>(false);
const approvedReviews = ref<Review[]>([]);
const expandedRows = ref<DataTableExpandedRows>({});

const loadApprovedReviews = () => {
    loading.value = true;

    fetchApprovedReviews()
        .then((response) => (approvedReviews.value = response.data.data))
        .catch((error: AxiosError) => {
            const message = error.message;
            toast.add({ severity: 'error', summary: message, life: 6000 });
        })
        .finally(() => {
            loading.value = false;
            removing.value = false;
        });
};

const removeReview = (id: string) => {
    removing.value = true;

    deleteReview(id)
        .then((response) => {
            const message = response.data.message;
            toast.add({ severity: 'success', summary: message, life: 6000 });
            loadApprovedReviews();
        })
        .catch((error: AxiosError) => {
            const message = error.message;
            toast.add({ severity: 'error', summary: message, life: 6000 });
            removing.value = false;
        });
};

loadApprovedReviews();
</script>
