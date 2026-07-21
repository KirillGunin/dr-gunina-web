<template>
    <div class="rating">
        <Rating
            :model-value="modelValue"
            allow-half
            :readonly="readonly"
            :pt="{
                root: {
                    style: {
                        gap: '8px',
                    },
                },
                onIcon: {
                    style: {
                        color: 'var(--p-gold-300)',
                        width: '30px',
                        height: '30px',
                    },
                },
                offIcon: {
                    style: {
                        color: 'var(--p-gold-300)',
                        width: '30px',
                        height: '30px',
                    },
                },
                ...pt,
            }"
            @update:model-value="emits('update:model-value', $event)"
        />
    </div>
</template>

<script lang="ts" setup>
type Props = {
    modelValue: number;
    readonly?: boolean;
    pt?: object;
};

withDefaults(defineProps<Props>(), {
    modelValue: 5,
    readonly: false,
});

const emits = defineEmits<{
    (event: 'update:model-value', payload: number): void;
}>();
</script>
