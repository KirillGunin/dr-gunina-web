<template>
    <header ref="header" class="header">
        <div class="container">
            <div class="header__container">
                <div>
                    <AppButton rounded raised variant="outlined" @click="sidebarVisible = true">
                        <i class="pi pi-bars"></i>
                        {{ t('header.menu') }}
                    </AppButton>
                </div>

                <!-- Логотип -->
                <div class="header__logo">
                    <NuxtLink to="/" class="header__logo-link" aria-label="Home">
                        <SvgIcon name="logo" />
                    </NuxtLink>
                </div>

                <!-- Бургер -->
                <div class="header__burger">
                    <AppSpeedDial />
                </div>
            </div>
        </div>

        <Drawer
            v-model:visible="sidebarVisible"
            :header="t('header.menu')"
            @click="sidebarVisible = false"
        >
            <!-- Навигация -->
            <nav class="header__menu" aria-label="Main navigation">
                <NuxtLink to="/" class="header__navigation-item">
                    <AppButton variant="text">
                        <i class="pi pi-home" />

                        {{ t('others.home') }}
                    </AppButton>
                </NuxtLink>

                <ul v-if="isHomePage" class="header__navigation">
                    <li
                        class="header__navigation-item"
                        v-for="item in navigationItems"
                        :key="item.title"
                    >
                        <AppButton variant="text" @click="scrollToSection(item.link)">
                            <i :class="item.icon"></i>
                            {{ t(item.title) }}
                        </AppButton>
                    </li>
                </ul>

                <NuxtLink to="/pollen" class="header__navigation-item">
                    <AppButton variant="text">
                        <i class="pi pi-asterisk" />

                        {{ t('header.pollen') }}
                    </AppButton>
                </NuxtLink>

                <NuxtLink to="/blog" class="header__navigation-item">
                    <AppButton variant="text">
                        <i class="pi pi-book" />

                        {{ t('header.blog') }}
                    </AppButton>
                </NuxtLink>

                <a
                    class="header__navigation-item"
                    :href="mailtoHref"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <AppButton variant="text" :aria-label="t('header.email-link')">
                        <i class="pi pi-envelope" />
                        {{ t('header.email-link') }}
                    </AppButton>
                </a>

                <a
                    class="header__navigation-item"
                    href="https://t.me/dr_ksgunina"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <AppButton variant="text" :aria-label="t('header.telegram-link')">
                        <i class="pi pi-send" />
                        {{ t('header.telegram-link') }}
                    </AppButton>
                </a>
            </nav>

            <div class="header__navigation-item">
                <AppButton variant="text" @click="moToProfile">
                    <i :class="!user ? 'pi pi-sign-in' : 'pi pi-user'"></i>
                    {{ t('header.account') }}
                </AppButton>
            </div>
        </Drawer>

        <ModalLogin :visible="modalLogin" @close:visible="modalLogin = false" />
    </header>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from '#vue-router';
import { useI18n } from '#imports';
import { buildMailto } from '~/utils/buildMailto';

import ModalLogin from '~/components/modals/ModalLogin.vue';
import { useAuth } from '~/stores/auth';

const route = useRoute();
const localePath = useLocalePath();
const { t } = useI18n();

const header = ref<HTMLElement | null>(null);
let scrollCleanup: (() => void) | null = null;
const modalLogin = ref<boolean>(false);
const sidebarVisible = ref<boolean>(false);

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
    { title: 'header.about', link: 'section-about', icon: 'pi pi-user' },
    { title: 'header.services', link: 'section-services', icon: 'pi pi-tags' },
    { title: 'header.contacts', link: 'section-contacts', icon: 'pi pi-phone' },
];

onMounted(() => {
    let rafId = 0;
    const onScroll = () => {
        cancelAnimationFrame(rafId);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    scrollCleanup = () => {
        window.removeEventListener('scroll', onScroll);
        cancelAnimationFrame(rafId);
    };
});

onUnmounted(() => scrollCleanup?.());
</script>
