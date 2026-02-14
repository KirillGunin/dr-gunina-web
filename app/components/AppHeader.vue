<template>
    <header class="header">
        <div class="container">
            <div class="header__container">
                <!-- Навигация -->
                <nav class="header__navigation" aria-label="Main navigation">
                    <ul class="header__menu">
                        <li
                            class="header__menu-item"
                            v-for="item in navigationItems"
                            :key="item.title"
                        >
                            <AppButton
                                rounded
                                :label="$t(item.title)"
                                :raised="item.active"
                                :variant="item.active ? 'outlined' : 'text'"
                                @click="scrollToSection(item.link)"
                            />
                        </li>
                    </ul>
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
                    >
                        <AppButton rounded raised variant="outlined">
                            <SvgIcon name="mail" />
                        </AppButton>
                    </a>

                    <AppButton rounded raised variant="outlined">
                        <SvgIcon name="telegram" />
                    </AppButton>

                    <AppPopoverLocale />

                    <AppButton rounded raised variant="outlined" @click="toggleMode">
                        <SvgIcon :name="isDarkMode ? 'lamp-on' : 'lamp-off'" />
                    </AppButton>
                </div>
            </div>
        </div>
    </header>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const isDarkMode = ref<boolean>(false);

const toggleMode = () => {
    isDarkMode.value = !isDarkMode.value;
    document.documentElement.classList.toggle('dark-mode');
};

const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = 80;
        const elementPosition = element.offsetTop - offset;

        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth',
        });
    }
};

const navigationItems = [
    { title: 'header.about', link: 'about', active: true },
    { title: 'header.services', link: 'services', active: false },
    { title: 'header.contacts', link: 'contacts', active: false },
];
</script>
