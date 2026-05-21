<template>
    <div class="privacy-policy">
        <AppSpinner
            class="privacy-policy__loading"
            v-if="loading"
            color="var(--folder-peach-heading)"
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
.privacy-policy {
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

    & ul {
        padding-left: 20px;
        margin: 8px 0;
    }

    & li {
        margin: 6px 0;
    }

    & table {
        width: 100%;
        border-collapse: collapse;
        margin: 16px 0;
    }

    & th,
    & td {
        border: 1px solid var(--p-surface-950);
        padding: 10px 14px;
        text-align: left;
        vertical-align: top;
    }

    & th {
        font-weight: 600;
    }

    & a {
        color: #1e26cc;
        text-decoration: underline;
    }
}
</style>
