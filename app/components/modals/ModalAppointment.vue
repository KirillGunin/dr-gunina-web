<template>
    <AppModal
        class="modal-appointment"
        width="34rem"
        :header="$t('forms.appointment.header')"
        :visible="visible"
        :pt="{
            header: {
                style: {
                    padding: '0 0 var(--spacer-md)',
                },
            },
            content: {
                style: {
                    padding: '0 var(--spacer-xs) var(--spacer-xs)',
                    overflow: 'scroll',
                    flexGrow: '0',
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none', // IE
                },
            },
        }"
        @close:visible="emits('close:visible')"
    >
        <FormAppointment />
    </AppModal>
</template>

<script setup lang="ts">
import FormAppointment from '@/components/forms/FormAppointment.vue';

type ServiceProps = {
    visible: boolean;
};

withDefaults(defineProps<ServiceProps>(), {
    visible: false,
});

const emits = defineEmits<{
    (event: 'close:visible'): void;
}>();
</script>
