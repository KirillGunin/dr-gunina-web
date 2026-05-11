<template>
    <div class="select">
        <Select
            :modelValue="modelValue"
            :options="options"
            :option-label="optionLabel"
            :option-value="optionValue"
            :placeholder="placeholder"
            :invalid="invalid"
            @update:model-value="emits('update:model-value', $event)"
        />
    </div>
</template>

<script lang="ts" setup>
type Props = {
    modelValue: string | null;
    options: any;
    placeholder?: string;
    optionLabel: string;
    optionValue: string;
    invalid: boolean;
};

withDefaults(defineProps<Props>(), {
    modelValue: '',
    options: [],
    placeholder: '',
    optionLabel: '',
    optionValue: '',
    invalid: false,
});

const emits = defineEmits<{
    (event: 'update:model-value', value: string): void;
}>();
</script>
