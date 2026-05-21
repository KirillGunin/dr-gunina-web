<template>
    <div class="privacy-offer">
        <AppSpinner
            class="privacy-policy__loading"
            v-if="loading"
            color="var(--folder-blue-heading)"
        />
        <div v-if="!loading && content" v-html="DOMPurify.sanitize(content)" />
    </div>
</template>

<script setup lang="ts">
import DOMPurify from 'dompurify';

defineProps<{
    loading: boolean;
    content?: string;
}>();
</script>

<style lang="scss">
.privacy-offer {
    display: contents;

    &__loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    & span {
        color: var(--notice-color);
        font-size: 13px;
    }

    & h2 {
        font-size: 18px;
        margin-top: 40px;
        margin-bottom: 12px;
    }

    & p {
        margin: 8px 0;
    }

    & a {
        color: #1e26cc;
        text-decoration: underline;
    }
}
</style>
