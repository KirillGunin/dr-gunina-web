<template>
    <Button
        class="button"
        :class="`button--${size}`"
        :label="label"
        :rounded="rounded"
        :variant="variant"
        :severity="severity"
        :raised="raised"
        :icon="icon"
        :size="size"
    >
        <slot />
    </Button>
</template>

<script setup lang="ts">
type ButtonProps = {
    label?: string;
    rounded?: boolean;
    variant?: 'text' | 'outlined' | 'link' | undefined;
    severity?: 'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'contrast' | undefined;
    size?: 'small' | 'normal' | 'large';
    raised?: boolean;
    icon?: string | undefined;
};

withDefaults(defineProps<ButtonProps>(), {
    label: '',
    rounded: false,
    variant: undefined,
    severity: undefined,
    size: 'normal',
    raised: false,
    icon: undefined,
});
</script>
