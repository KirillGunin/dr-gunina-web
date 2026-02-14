<template>
    <Dialog
        class="modal"
        :visible="visible"
        modal
        closable
        closeOnEscape
        blockScroll
        dismissable-mask
        :pt="pt"
        :style="{
            width: width,
            height: height
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
    height?: string;
    pt?: object
}

withDefaults(defineProps<DialogProps>(), {
    visible: false,
    width: "25rem",
    height: "auto",
});

const emits = defineEmits<{
    (event: "close:visible"): void;
}>();
</script>