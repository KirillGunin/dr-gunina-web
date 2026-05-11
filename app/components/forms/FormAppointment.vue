<template>
    <div class="form-appointment">
        <AppForm
            class="form-appointment__form"
            :method="createAppointment"
            :init-fields="{
                name: '',
                childName: '',
                childAge: '',
                childGender: '',
                phone: '',
                telegram: '',
                description: '',
                agreement: false,
            }"
            :rules="appointmentRules"
            v-model="state"
            v-slot="{ fields, frontendErrors, backendErrors, sending }"
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
                    :frontend-errors="frontendErrors?.childName?.$errors"
                    v-slot="{ invalid }"
                >
                    <AppInput
                        v-model="fields.childName"
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
                    :frontend-errors="frontendErrors?.childAge?.$errors"
                    v-slot="{ invalid }"
                >
                    <AppInput
                        v-model="fields.childAge"
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
                    :label="$t('forms.appointment.child-gender')"
                    :frontend-errors="frontendErrors?.childGender?.$errors"
                    v-slot="{ invalid }"
                >
                    <AppSelect
                        :model-value="fields.childGender"
                        :placeholder="$t('forms.appointment.placeholder-child-gender')"
                        option-value="value"
                        option-label="label"
                        :options="genders"
                        :invalid="invalid"
                        @update:model-value="fields.childGender = $event"
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
                        :pt="{ root: { style: 'resize:none' } }"
                        :invalid="invalid"
                    />
                </AppField>

                <AppField
                    class="form-appointment__field--agreement"
                    :frontend-errors="frontendErrors?.agreement?.$errors"
                    v-slot="{ invalid }"
                >
                    <div class="form-appointment__field--agreement-content">
                        <a href="/privacy" target="_blank" rel="noreferrer noopener">
                            {{ $t('forms.appointment.privacy') }}
                        </a>

                        <Checkbox v-model="fields.agreement" binary :invalid="invalid" />
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
            />
        </AppForm>
    </div>
</template>

<script lang="ts" setup>
import { createAppointment } from '~/api/appointment';
import { useAppointmentRules } from '~/components/forms/validationRules/formAppointmentRules';

const { t } = useI18n();

const state = ref({
    name: '',
    childName: '',
    childAge: '',
    childGender: '',
    phone: '',
    telegram: '',
    description: '',
    agreement: false,
});
const { appointmentRules } = useAppointmentRules(state);

const genders = [
    { value: 'male', label: t('forms.appointment.gender-male') },
    { value: 'female', label: t('forms.appointment.gender-female') },
];
</script>
