<template>
    <form class="form" @submit.prevent="submit">
        <slot
            :fields="state"
            :frontend-errors="v$"
            :sending="formData.sending"
            :backend-errors="formData.backendErrors"
            :message="formData.message"
        ></slot>
    </form>
</template>

<script setup lang="ts">
import { reactive, onMounted, watch, nextTick } from 'vue';
import useVuelidate from '@vuelidate/core';
import type { ValidationRule } from '@vuelidate/core';
import type { AxiosResponse } from 'axios';

type FormState = Record<string, any>;

interface Props {
    method: (data: FormState) => Promise<unknown>;
    modelValue?: FormState;
    initFields?: FormState;
    rules?: Record<string, Record<string, ValidationRule | ValidationRule[]>>;
    autoDirty?: boolean;
    lazy?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    method: () => () => Promise.resolve(),
    modelValue: () => ({}),
    initFields: () => ({}),
    rules: () => ({}),
    autoDirty: false,
    lazy: false,
});

const emit = defineEmits<{
    'update:modelValue': [payload: FormState];
    beforeSend: [payload: FormState];
    success: [payload: AxiosResponse];
    error: [payload: Record<string, unknown>];
    validationFailed: [payload: object];
}>();

const state = reactive<FormState>({});

const formData = reactive({
    sending: false,
    backendErrors: [] as string[],
    message: '',
});

let v$ = useVuelidate(props.rules, state, { $autoDirty: props.autoDirty, $lazy: props.lazy });

const scrollIntoErrorField = async () => {
    await nextTick();

    const errorField = document.querySelector('.field--error');

    if (errorField) {
        errorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
};

const reset = () => {
    Object.keys(state).forEach((key) => {
        if (!(key in props.initFields)) {
            delete state[key];
        }
    });

    Object.entries(props.initFields).forEach(([key, value]) => {
        state[key] = value;
    });
};

async function submit() {
    emit('beforeSend', state);

    const isFormCorrect = await v$.value.$validate();

    if (isFormCorrect) {
        formData.sending = true;
        formData.backendErrors = [];
        formData.message = '';

        try {
            const response = await props.method(state);
            emit('success', response as AxiosResponse);
        } catch (error: unknown) {
            const axiosError = error as {
                response?: { data?: { errors?: string[]; message?: string } };
            };
            const errorResponseData = axiosError?.response?.data ?? {};

            formData.backendErrors = errorResponseData.errors ?? [];
            formData.message = errorResponseData.message ?? 'Unexpected error';

            emit('error', errorResponseData);
            await scrollIntoErrorField();
        } finally {
            formData.sending = false;
        }
    } else {
        emit('validationFailed', v$);
        await scrollIntoErrorField();
    }
}

watch(
    state,
    () => {
        emit('update:modelValue', state);
    },
    {
        deep: true,
        immediate: true,
    }
);

watch(
    () => props.rules,
    () => {
        v$ = useVuelidate(props.rules, state, { $autoDirty: props.autoDirty });
    }
);

onMounted(() => {
    reset();
});

defineExpose({
    reset,
    submit,
});
</script>
