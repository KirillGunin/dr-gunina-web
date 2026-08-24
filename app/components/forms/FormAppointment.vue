<template>
    <div class="form-appointment">
        <AppForm
            class="form-appointment__form"
            :method="
                (data) =>
                    createAppointment({
                        ...data,
                        phone: data.phone || null,
                        telegram: data.telegram || null,
                    } as Appointment)
            "
            :init-fields="{
                name: '',
                child_name: '',
                child_age: '',
                child_gender: '',
                phone: null,
                telegram: null,
                description: '',
                agreement: false,
            }"
            :rules="appointmentRules"
            v-model="state"
            v-slot="{ fields, frontendErrors, backendErrors, sending }"
            @success="(response) => emits('success:appointment', response)"
            @validation-failed="validationError"
        >
            <div class="form-appointment__fields">
                <AppField
                    :label="$t('forms.appointment.label-name')"
                    :frontend-errors="frontendErrors?.name?.$errors"
                    v-slot="{ invalid }"
                >
                    <AppInput
                        v-model="fields.name"
                        :placeholder="$t('forms.appointment.placeholder-name')"
                        :mask-options="{
                            regex: '[A-Za-zА-Яа-яЁё\\s-]+',
                            showMaskOnHover: false,
                            showMaskOnFocus: false,
                        }"
                        :invalid="invalid"
                    />
                </AppField>

                <AppField
                    :label="$t('forms.appointment.label-child-name')"
                    :frontend-errors="frontendErrors?.child_name?.$errors"
                    v-slot="{ invalid }"
                >
                    <AppInput
                        v-model="fields.child_name"
                        :placeholder="$t('forms.appointment.placeholder-child-name')"
                        :mask-options="{
                            regex: '[A-Za-zА-Яа-яЁё\\s-]+',
                            showMaskOnHover: false,
                            showMaskOnFocus: false,
                        }"
                        :invalid="invalid"
                    />
                </AppField>

                <AppField
                    :label="$t('forms.appointment.label-child-age')"
                    :frontend-errors="frontendErrors?.child_age?.$errors"
                    v-slot="{ invalid }"
                >
                    <AppInput
                        v-model="fields.child_age"
                        :placeholder="$t('forms.appointment.placeholder-child-age')"
                        :mask-options="{
                            regex: '\\d*',
                            showMaskOnHover: false,
                            showMaskOnFocus: false,
                        }"
                        :invalid="invalid"
                    />
                </AppField>

                <AppField
                    :label="$t('forms.appointment.label-child-gender')"
                    :frontend-errors="frontendErrors?.child_gender?.$errors"
                    v-slot="{ invalid }"
                >
                    <AppSelect
                        :model-value="fields.child_gender"
                        :placeholder="$t('forms.appointment.placeholder-child-gender')"
                        option-value="value"
                        option-label="label"
                        :options="genders"
                        :invalid="invalid"
                        @update:model-value="fields.child_gender = $event"
                    />
                </AppField>

                <AppField
                    :label="$t('forms.appointment.label-telegram')"
                    :frontend-errors="frontendErrors?.telegram?.$errors"
                    v-slot="{ invalid }"
                >
                    <AppInput
                        v-model="fields.telegram"
                        :placeholder="$t('forms.appointment.placeholder-telegram')"
                        :invalid="invalid"
                        :mask-options="{
                            regex: '@[A-Za-z][A-Za-z0-9_]{4,32}',
                            onUnMask: (masked: string, unmasked: string) => {
                                return unmasked;
                            },
                        }"
                        unmask
                    />
                </AppField>

                <AppField
                    :label="$t('forms.appointment.label-phone')"
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

                <AppField
                    class="form-appointment__field--description"
                    :label="$t('forms.appointment.label-description')"
                    :frontend-errors="frontendErrors?.description?.$errors"
                    v-slot="{ invalid }"
                >
                    <Textarea
                        v-model="fields.description"
                        :placeholder="$t('forms.appointment.placeholder-description')"
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
                    class="form-appointment__field--agreement"
                    :frontend-errors="frontendErrors?.agreement?.$errors"
                    v-slot="{ invalid }"
                >
                    <div class="form-appointment__field--agreement-content">
                        <a
                            class="form-appointment__field--agreement-link"
                            href="/privacy"
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            {{ $t('forms.appointment.privacy') }}
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
                class="form-appointment__control"
                type="submit"
                :label="$t('forms.appointment.action')"
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
import { createAppointment } from '~/api/appointment';
import { useAppointmentRules } from '~/components/forms/validationRules/formAppointmentRules';
import type { AxiosResponse } from 'axios';
import type { Appointment } from '~/types/appointment';

const emits = defineEmits<{
    (event: 'success:appointment', response: AxiosResponse): void;
}>();

const { t } = useI18n();
const toast = useToast();

const state = ref({
    name: '',
    child_name: '',
    child_age: '',
    child_gender: '',
    phone: null,
    telegram: null,
    description: '',
    agreement: false,
});

const { appointmentRules } = useAppointmentRules(state);

const validationError = () => {
    toast.add({
        severity: 'error',
        summary: t('errors.common.error'),
        detail: t('errors.appointment.error'),
        life: 6000,
    });
};

const genders = [
    { value: 'male', label: t('forms.appointment.gender-male') },
    { value: 'female', label: t('forms.appointment.gender-female') },
];
</script>
