<template>
    <header ref="header" class="header">
        <div class="container">
            <div class="header__container">
                <!-- Навигация -->
                <nav class="header__navigation" aria-label="Main navigation">
                    <ul v-if="isHomePage" class="header__menu">
                        <li
                            class="header__menu-item"
                            v-for="item in navigationItems"
                            :key="item.title"
                        >
                            <AppButton
                                style="white-space: nowrap"
                                rounded
                                :label="$t(item.title)"
                                :raised="activeSection === item.link"
                                :severity="activeSection === item.link ? 'contrast' : undefined"
                                :variant="activeSection === item.link ? undefined : 'text'"
                                :size="isMobile ? 'small' : 'normal'"
                                @click="scrollToSection(item.link)"
                            />
                        </li>
                    </ul>

                    <NuxtLink v-else to="/" class="header__menu-item--home">
                        <AppButton rounded raised variant="outlined">
                            <SvgIcon name="home" style="stroke-width: 2.5" />
                            {{ $t('others.home') }}
                        </AppButton>
                    </NuxtLink>
                </nav>

                <!-- Логотип -->
                <div class="header__logo">
                    <a href="/" class="header__logo-link" aria-label="Home">
                        <SvgIcon name="logo" />
                    </a>
                </div>

                <!-- Соц сети -->
                <div class="header__socials">
                    <AppButton rounded raised variant="outlined" @click="moToProfile">
                        <i :class="!user ? 'pi pi-sign-in' : 'pi pi-user'"></i>
                    </AppButton>

                    <a :href="mailtoHref" target="_blank" rel="noopener noreferrer">
                        <AppButton
                            rounded
                            raised
                            variant="outlined"
                            :aria-label="$t('header.email-link')"
                        >
                            <SvgIcon name="mail" />
                        </AppButton>
                    </a>

                    <a href="https://t.me/dr_ksgunina" target="_blank" rel="noopener noreferrer">
                        <AppButton
                            rounded
                            raised
                            variant="outlined"
                            :aria-label="$t('header.telegram-link')"
                        >
                            <SvgIcon name="telegram" />
                        </AppButton>
                    </a>

                    <AppPopoverLocale />

                    <AppButton
                        rounded
                        raised
                        variant="outlined"
                        :aria-label="
                            isDarkMode
                                ? $t('header.theme-toggle-light')
                                : $t('header.theme-toggle-dark')
                        "
                        @click="toggleMode"
                    >
                        <SvgIcon :name="isDarkMode ? 'lamp-on' : 'lamp-off'" />
                    </AppButton>
                </div>

                <!-- Бургер -->
                <div class="header__burger">
                    <AppSpeedDial />
                </div>
            </div>
        </div>

        <ModalLogin :visible="modalLogin" @close:visible="modalLogin = false" />
    </header>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from '#vue-router';
import { useI18n } from '#imports';
import { useTheme } from '~/composables/useTheme';
import { useBreakpoints } from '~/composables/useBreakpoins';
import { buildMailto } from '~/utils/buildMailto';

import ModalLogin from '~/components/modals/ModalLogin.vue';
import { useAuth } from '~/stores/auth';

const route = useRoute();
const localePath = useLocalePath();
const { t } = useI18n();
const { isMobile } = useBreakpoints();
const { isDarkMode, toggleMode } = useTheme();

const activeSection = ref<string>('section-about');
const header = ref<HTMLElement | null>(null);
let scrollCleanup: (() => void) | null = null;
const modalLogin = ref<boolean>(false);

const isHomePage = computed(() => route.path === localePath('/'));
const user = computed(() => useAuth().user);
const mailtoHref = computed(() =>
    buildMailto('dr.kseniagunina@yandex.ru', t('header.email-subject'), t('header.email-body'))
);

const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const offset = (header.value?.offsetHeight ?? 100) + 20;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
};

const moToProfile = () => {
    if (!user.value) {
        modalLogin.value = true;
        return;
    }

    navigateTo('/admin');
};

const navigationItems = [
    { title: 'header.about', link: 'section-about' },
    { title: 'header.services', link: 'section-services' },
    { title: 'header.contacts', link: 'section-contacts' },
];

onMounted(() => {
    const sections = navigationItems
        .map((i) => document.getElementById(i.link))
        .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const updateActive = () => {
        const triggerY = (header.value?.offsetHeight ?? 100) + window.innerHeight * 0.35;
        let current = sections[0]?.id;

        for (const section of sections) {
            if (section.getBoundingClientRect().top <= triggerY) {
                current = section.id;
            }
        }

        if (current) {
            activeSection.value = current;
        }
    };

    let rafId = 0;
    const onScroll = () => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(updateActive);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateActive();

    scrollCleanup = () => {
        window.removeEventListener('scroll', onScroll);
        cancelAnimationFrame(rafId);
    };
});

onUnmounted(() => scrollCleanup?.());
</script>
