<template>
    <footer class="footer" id="contacts">
        <div class="container">
            <div class="footer__content">
                <address class="footer__contact">
                    <a
                        href="mailto:dr.kseniagunina@yandex.ru?subject=Письмо с сайта&body=Здравствуйте, Ксения Александровна!%0D%0A%0D%0AХочу уточнить по поводу "
                    >
                        dr.kseniagunina@yandex.ru
                    </a>
                </address>

                <p class="footer__info">
                    <span>Гунина Ксения Александровна</span>
                    <span>ИНН: 470518050729</span>
                </p>

                <nav class="footer__nav" aria-label="Footer navigation">
                    <NuxtLink to="/service-terms">
                        Порядок оформления, сроки исполнения услуги и условия оплаты
                    </NuxtLink>

                    <NuxtLink to="/legal-rules"> Политика обработки персональных данных </NuxtLink>
                </nav>
            </div>
        </div>
    </footer>
</template>
<script setup lang="ts"></script>
