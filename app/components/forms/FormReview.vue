<template>
    <div class="form-review">
        <AppForm
            class="form-review__form"
            :method="(data) => createReview(data as NewReview)"
            :init-fields="{
                name: '',
                last_name: '',
                phone: '',
                text: '',
                rating: 5,
                agreement: false,
            }"
            :rules="reviewRules"
            v-model="state"
            v-slot="{ fields, frontendErrors, sending }"
            @success="(response) => emits('success:review', response)"
        >
            <div class="form-review__fields">
                <AppField
                    :label="$t('forms.review.label-name')"
                    :frontend-errors="frontendErrors?.name?.$errors"
                    v-slot="{ invalid }"
                >
                    <AppInput
                        v-model="fields.name"
                        :placeholder="$t('forms.review.placeholder-name')"
                        :mask-options="{
                            regex: '[A-Za-zА-Яа-яЁё\\s-]+',
                            showMaskOnHover: false,
                            showMaskOnFocus: false,
                        }"
                        :invalid="invalid"
                    />
                </AppField>

                <AppField
                    :label="$t('forms.review.label-last-name')"
                    :frontend-errors="frontendErrors?.last_name?.$errors"
                    v-slot="{ invalid }"
                >
                    <AppInput
                        v-model="fields.last_name"
                        :placeholder="$t('forms.review.placeholder-last-name')"
                        :mask-options="{
                            regex: '[A-Za-zА-Яа-яЁё\\s-]+',
                            showMaskOnHover: false,
                            showMaskOnFocus: false,
                        }"
                        :invalid="invalid"
                    />
                </AppField>

                <AppField
                    :label="$t('forms.review.label-phone')"
                    :frontend-errors="frontendErrors?.phone?.$errors"
                    v-slot="{ invalid }"
                >
                    <AppInput
                        v-model="fields.phone"
                        placeholder="+7 (___) ___-__-__"
                        :invalid="invalid"
                        :mask-options="{
                            mask: '+7 (999) 999-99-99',
                            onUnMask: (masked: string, unmasked: string) => {
                                return unmasked;
                            },
                        }"
                        unmask
                    />
                </AppField>

                <AppField :label="$t('forms.review.label-rating')">
                    <AppRating class="form-review__info-rating" :model-value="state.rating" />
                </AppField>

                <AppField
                    class="form-review__field--text"
                    :label="$t('forms.review.label-text')"
                    :frontend-errors="frontendErrors?.text?.$errors"
                    v-slot="{ invalid }"
                >
                    <Textarea
                        v-model="fields.text"
                        :placeholder="$t('forms.review.placeholder-text')"
                        rows="5"
                        cols="30"
                        :aria-expanded="false"
                        :pt="{
                            root: {
                                style: { resize: 'none' },
                            },
                        }"
                        :invalid="invalid"
                    />
                </AppField>

                <AppField
                    class="form-review__field--agreement"
                    :frontend-errors="frontendErrors?.agreement?.$errors"
                    v-slot="{ invalid }"
                >
                    <div class="form-review__field--agreement-content">
                        <a
                            class="form-review__field--agreement-link"
                            href="/privacy"
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            {{ $t('forms.review.privacy') }}
                        </a>

                        <Checkbox
                            v-model="fields.agreement"
                            binary
                            :invalid="invalid"
                            :pt="{
                                border: {
                                    style: {
                                        invalid: {
                                            color: 'var(--base-red)',
                                        },
                                    },
                                },
                            }"
                        />
                    </div>
                </AppField>
            </div>

            <AppButton
                class="form-review__control"
                type="submit"
                :label="$t('forms.review.action')"
                variant="outlined"
                severity="success"
                raised
                rounded
                :loading="sending"
            />
        </AppForm>
    </div>
</template>

<script lang="ts" setup>
import { useReviewRules } from '~/components/forms/validationRules/formReviewRules';
import { createReview } from '~/api/reviews';
import type { AxiosResponse } from 'axios';
import type { NewReview } from '~/types/reviews';

const emits = defineEmits<{
    (event: 'success:review', response: AxiosResponse): void;
}>();

const { t } = useI18n();

const state = ref<NewReview>({
    name: '',
    last_name: '',
    phone: '',
    text: '',
    rating: 5,
    agreement: false,
});

const { reviewRules } = useReviewRules(state);
</script>
