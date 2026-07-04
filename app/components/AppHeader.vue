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
                    <a
                        href="mailto:dr.kseniagunina@yandex.ru?subject=Письмо с сайта&body=Здравствуйте, Ксения Александровна!%0D%0A%0D%0AХочу уточнить по поводу "
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <AppButton rounded raised variant="outlined">
                            <SvgIcon name="mail" />
                        </AppButton>
                    </a>

                    <a href="https://t.me/dr_ksgunina" target="_blank" rel="noopener noreferrer">
                        <AppButton rounded raised variant="outlined">
                            <SvgIcon name="telegram" />
                        </AppButton>
                    </a>

                    <AppPopoverLocale />

                    <AppButton rounded raised variant="outlined" @click="toggleMode">
                        <SvgIcon :name="isDarkMode ? 'lamp-on' : 'lamp-off'" />
                    </AppButton>
                </div>

                <!-- Бургер -->
                <div class="header__burger">
                    <AppSpeedDial />
                </div>
            </div>
        </div>
    </header>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from '#vue-router';
import { useTheme } from '~/composables/useTheme';
import { useBreakpoints } from '~/composables/useBreakpoins';

const route = useRoute();
const localePath = useLocalePath();
const { isMobile } = useBreakpoints();
const { isDarkMode, toggleMode } = useTheme();

const activeSection = ref<string>('section-about');
const header = ref<HTMLElement | null>(null);
let scrollCleanup: (() => void) | null = null;

const isHomePage = computed(() => route.path === localePath('/'));

const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const offset = (header.value?.offsetHeight ?? 100) + 20;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
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
