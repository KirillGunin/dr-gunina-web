<template>
    <div class="search">
        <AppInput v-model="search" :placeholder="placeholder" :size="size" :rounded="rounded" />

        <div class="search__controls">
            <i
                v-if="search"
                class="pi pi-times search__control search__control--close"
                @click="clearSearch"
            />

            <AppButton
                severity="success"
                raised
                rounded
                :size="isMobile ? 'small' : 'normal'"
                @click="event('search', search)"
            >
                <i class="pi pi-search" />

                {{ $t('others.find-out') }}
            </AppButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useBreakpoints } from '~/composables/useBreakpoins';

const { isMobile } = useBreakpoints();
defineProps<{
    size?: 'xs' | 'sm' | 'lg';
    rounded: boolean;
    placeholder: string;
}>();

const search = ref<string>('');

const event = defineEmits<{
    (event: 'search', payload: string): void;
    (event: 'clear'): void;
}>();

const clearSearch = () => {
    search.value = '';
    event('clear');
};
</script>
