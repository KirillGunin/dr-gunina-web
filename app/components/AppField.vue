<template>
    <div
        class="field"
        :class="{ 'field--error': frontendErrors?.length > 0 || backendErrors?.length > 0 }"
    >
        <label v-if="label" class="field__label">
            {{ label }}
        </label>

        <slot :invalid="frontendErrors?.length > 0 || backendErrors?.length > 0"></slot>

        <div v-if="frontendErrors?.length > 0" class="field__error">
            {{ frontendErrors[0]?.$message }}
        </div>

        <div v-if="backendErrors?.length > 0" class="field__error">
            {{ backendErrors[0] }}
        </div>

        <div v-if="customErrors?.length > 0" class="field__error">
            {{ customErrors[0] }}
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ErrorObject } from '@vuelidate/core';

interface Props {
    label?: string;
    frontendErrors?: ErrorObject[];
    backendErrors?: string[];
    customErrors?: string[];
}

withDefaults(defineProps<Props>(), {
    label: '',
    frontendErrors: () => [],
    backendErrors: () => [],
    customErrors: () => [],
});
</script>
