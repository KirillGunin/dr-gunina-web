<template>
    <Button
        as-child
        :rounded="rounded"
        :variant="variant"
        :severity="severity"
        :raised="raised"
        :size="size"
        v-slot="{ class: buttonClass, a11yAttrs }"
    >
        <NuxtLink :to="to" class="button" :class="[buttonClass, `button--${size}`]" v-bind="a11yAttrs">
            <span v-if="label" class="p-button-label">{{ label }}</span>
            <slot />
        </NuxtLink>
    </Button>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

type ButtonLinkProps = {
    to: RouteLocationRaw;
    label?: string;
    rounded?: boolean;
    variant?: 'text' | 'outlined' | 'link' | undefined;
    severity?: 'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'contrast' | undefined;
    size?: 'small' | 'normal' | 'large';
    raised?: boolean;
};

withDefaults(defineProps<ButtonLinkProps>(), {
    label: '',
    rounded: false,
    variant: undefined,
    severity: undefined,
    size: 'normal',
    raised: false,
});
</script>
