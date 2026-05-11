<template>
    <input
        ref="inputElement"
        class="input"
        :class="{ invalid: props.invalid }"
        :disabled="disabled"
        :value="modelValue"
        @input="input"
        @change="input"
        v-bind="$attrs"
    />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Inputmask from 'inputmask';

type Input = string | null;

interface Props {
    modelValue: Input;
    /** Можно посмотреть в документации https://robinherbots.github.io/Inputmask/#/documentation */
    maskOptions?: Inputmask.Options | null;
    /** Если нужно, чтобы в поле отображалась маска, но значение возвращалось без неё */
    unmask?: boolean;
    invalid?: boolean;
    disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    maskOptions: null,
    unmask: false,
    invalid: false,
    disabled: false,
});

const emit = defineEmits<{
    (event: 'update:modelValue', payload: Input): void;
}>();

const inputElement = ref<HTMLInputElement | null>(null);
const inputMask = ref<Inputmask.Instance | null>(null);

const input = (e: Event) => {
    const target = e.target as HTMLInputElement;

    if (props.maskOptions) {
        if (props.unmask) {
            const val = inputMask.value
                ? (inputMask.value as Inputmask.Instance).unmaskedvalue()
                : (inputElement.value?.value ?? '');

            emit('update:modelValue', val as Input);
        } else {
            emit('update:modelValue', target.value);
        }
    } else {
        emit('update:modelValue', target.value);
    }
};

onMounted(() => {
    if (props.maskOptions && inputElement.value) {
        const im = new Inputmask(props.maskOptions);
        im.mask(inputElement.value);
        inputMask.value = (inputElement.value as any).inputmask as Inputmask.Instance;
    }
});

onBeforeUnmount(() => {
    if (inputMask.value && inputElement.value) {
        Inputmask.remove(inputElement.value);
    }
});
</script>
