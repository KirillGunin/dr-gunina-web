<template>
    <div class="page-admin">
        <div class="page-admin__content">
            <div class="page-admin__header">
                <h1>С возвращением, {{ admin?.name }}</h1>

                <AppButton
                    variant="outlined"
                    severity="danger"
                    rounded
                    raised
                    @click="logoutRequest()"
                >
                    <i class="pi pi-sign-out"></i>

                    Выйти
                </AppButton>
            </div>

            <div class="page-admin__reviews">
                <p class="page-admin__reviews-title">Отзывы ожидающие модерации</p>

                <div class="page-admin__reviews-table">
                    <DataTable
                        v-model:expandedRows="expandedRows"
                        :value="pendingReviews"
                        :loading="patchingReview"
                        dataKey="id"
                        tableStyle="min-width: 50rem"
                        @rowExpand="onRowExpand"
                        @rowCollapse="onRowCollapse"
                    >
                        <Column expander style="width: 5rem" />

                        <Column header="Пользователь">
                            <template #body="slotProps">
                                {{ slotProps.data.name }} {{ slotProps.data.last_name }}
                            </template>
                        </Column>

                        <Column header="Телефон">
                            <template #body="slotProps">
                                {{ formatPhone(slotProps.data.phone) }}
                            </template>
                        </Column>

                        <Column header="Дата создания">
                            <template #body="slotProps">
                                {{ formatDate(slotProps.data.created_at) }}
                            </template>
                        </Column>

                        <Column header="Рейтинг">
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

                        <Column header="Действия">
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
                            <h4 class="page-admin__reviews-table-review-title">Текст отзыва:</h4>
                            <span>{{ slotProps.data.text }}</span>
                        </template>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useAuth } from '~/stores/auth';
import { logoutRequest } from '~/api/auth';
import { fetchPendingReviews, approvePendingReviews, rejectPendingReviews } from '~/api/reviews';
import { formatDate } from '~/utils/formatTime';
import type { Review } from '~/types/reviews';
import type {
    DataTableExpandedRows,
    DataTableRowExpandEvent,
    DataTableRowCollapseEvent,
} from 'primevue/datatable';
import type { AxiosError, AxiosResponse } from 'axios';
import { formatPhone } from '~/utils/formatPhone';

definePageMeta({ layout: 'admin' });

const toast = useToast();

const admin = computed(() => useAuth().user);
const loading = ref<boolean>(false);
const pendingReviews = ref<Review[]>([]);
const expandedRows = ref<DataTableExpandedRows>({});
const patchingReview = ref<boolean>(false);

const onRowExpand = (event: DataTableRowExpandEvent) => {
    // например, можно ничего не делать, просто чтобы не было ошибки undefined
};

const onRowCollapse = (event: DataTableRowCollapseEvent) => {
    // аналогично
};

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
    console.log(123, id);
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
