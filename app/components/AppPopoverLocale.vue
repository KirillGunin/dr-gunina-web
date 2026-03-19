<template>
    <div class="popover-locale">
        <AppButton rounded raised variant="outlined" @click="languagePopover.toggle($event)">
            <span class="popover-locale__icon">{{ locale }}</span>
        </AppButton>

        <Popover class="popover-locale__popover" ref="languagePopover">
            <div class="popover-locale__content">
                <div
                    class="popover-locale__country"
                    v-for="country in locales"
                    :key="country.code"
                    @click="selectLocale(country.code)"
                >
                    <SvgIcon :name="country.code" />
                    <span>{{ country.name }}</span>
                </div>
            </div>
        </Popover>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from '#imports';

const { locales, locale, setLocale } = useI18n();

const languagePopover = ref();

const selectLocale = (locale: 'ru' | 'es' | 'en') => {
    setLocale(locale);
    languagePopover.value.hide();
};
</script>
