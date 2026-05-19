<template>
    <ProgressSpinner
        :style="{
            width: width,
            height: height,
            margin: 'auto',
        }"
        :strokeWidth="strokeWidth"
        :pt="{
            circle: {
                style: `stroke: ${color}!important`,
            },
        }"
        fill="transparent"
        aria-label="Loading"
    />
</template>

<script lang="ts" setup>
type SpinnerProps = {
    width?: string;
    height?: string;
    strokeWidth?: string;
    color?: string;
};

withDefaults(defineProps<SpinnerProps>(), {
    width: '50px',
    height: '50px',
    strokeWidth: '6',
});
</script>
