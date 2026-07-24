<template>
    <div class="form-login">
        <AppForm
            class="form-login__form"
            :method="(data) => auth.login(data as LoginPayload)"
            :init-fields="{
                email: '',
                password: '',
            }"
            :rules="loginRules"
            v-model="state"
            v-slot="{ fields, frontendErrors, backendErrors, sending }"
            @success="(response) => emits('success:login', response)"
            @error="failedLogin"
        >
            <div class="form-login__fields">
                <AppField
                    :label="$t('forms.login.label-email')"
                    :frontend-errors="frontendErrors?.email?.$errors"
                    :backend-errors="backendErrors?.email"
                    v-slot="{ invalid }"
                >
                    <AppInput
                        v-model="fields.email"
                        :placeholder="$t('forms.login.placeholder-email')"
                        :invalid="invalid"
                    />
                </AppField>

                <div class="form-login__fields">
                    <AppField
                        :label="$t('forms.review.label-name')"
                        :frontend-errors="frontendErrors?.password?.$errors"
                        :backend-errors="backendErrors?.password"
                        v-slot="{ invalid }"
                    >
                        <AppInputPassword
                            v-model="fields.password"
                            autocomplete="current-password"
                            :placeholder="$t('forms.review.placeholder-name')"
                            :invalid="invalid"
                        />
                    </AppField>
                </div>
            </div>

            <AppButton
                class="form-login__control"
                type="submit"
                variant="outlined"
                severity="success"
                raised
                :loading="sending"
            >
                <i class="pi pi-sign-in"></i>

                {{ $t('forms.login.action') }}
            </AppButton>
        </AppForm>
    </div>
</template>

<script lang="ts" setup>
import { useLoginRules } from '~/components/forms/validationRules/formLoginRules';
import { useAuth } from '~/stores/auth';
import type { AxiosResponse } from 'axios';
import type { LoginErrorResponse, LoginPayload } from '~/types/auth';

const toast = useToast();
const auth = useAuth();

const emits = defineEmits<{
    (event: 'success:login', response: AxiosResponse): void;
}>();

const state = ref<LoginPayload>({
    email: '',
    password: '',
});

const { loginRules } = useLoginRules(state);

const failedLogin = (error: unknown) => {
    const summary = (error as LoginErrorResponse).message;
    toast.add({ severity: 'error', summary, life: 6000 });
};
</script>
