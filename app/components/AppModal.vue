<template>
    <Dialog
        class="modal"
        :visible="visible"
        modal
        closable
        closeOnEscape
        blockScroll
        :dismissable-mask="dismissableMask"
        :header="header"
        :pt="{
            ...pt,
            pcCloseButton: {
                root: {
                    style: {
                        outline: 'none',
                        boxShadow: 'none',
                        background: 'transparent',
                    },
                },
            },
        }"
        :style="{
            width: width,
        }"
        @update:visible="emits('close:visible')"
    >
        <div class="modal__content">
            <slot />
        </div>
    </Dialog>
</template>

<script setup lang="ts">
type DialogProps = {
    visible: boolean;
    width?: string;
    pt?: object;
    header?: string;
    dismissableMask?: boolean;
};

withDefaults(defineProps<DialogProps>(), {
    visible: false,
    width: '25rem',
    dismissableMask: true,
});

const emits = defineEmits<{
    (event: 'close:visible'): void;
}>();
</script>
