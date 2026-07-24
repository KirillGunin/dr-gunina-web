<template>
    <Password
        :model-value="modelValue"
        :placeholder="placeholder"
        toggle-mask
        :input-props="{ autocomplete: autocomplete }"
        :invalid="invalid"
        :feedback="false"
        :pt="{
            root: {
                style: {
                    width: '100%',
                },
            },
            pcInputText: {
                root: {
                    style: {
                        width: '100%',
                    },
                },
            },
        }"
        @update:model-value="emits('update:model-value', $event)"
    />
</template>

<script lang="ts" setup>
type Props = {
    modelValue: string;
    invalid?: boolean;
    disabled?: boolean;
    autocomplete: string;
    placeholder: string;
};

withDefaults(defineProps<Props>(), {
    modelValue: '',
    invalid: false,
    disabled: false,
    autocomplete: '',
    placeholder: '',
});

const emits = defineEmits<{
    (event: 'update:model-value', value: string): void;
}>();
</script>
