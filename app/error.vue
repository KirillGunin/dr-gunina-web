<template>
    <NuxtLayout name="default">
        <div class="page-error">
            <div class="container">
                <p class="page-error__code">{{ error.statusCode }}</p>

                <h1 class="page-error__title">
                    {{ $t('pages.error.title-404') }}
                </h1>

                <p class="page-error__description">
                    {{ $t('pages.error.description-404') }}
                </p>

                <AppButton
                    severity="contrast"
                    rounded
                    raised
                    :label="$t('others.home')"
                    @click="goHome"
                />
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps<{
    error: NuxtError;
}>();

const localePath = useLocalePath();

const goHome = () => clearError({ redirect: localePath('/') });
</script>
