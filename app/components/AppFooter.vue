<template>
    <footer class="footer" id="contacts">
        <div class="container">
            <div class="footer__content">
                <ContactsMapSection />

                <div class="footer__info">
                    <p class="footer__inn">
                        <span>Гунина Ксения Александровна</span>
                        <span>ИНН: 470518050729</span>
                    </p>

                    <nav class="footer__nav-links" aria-label="Footer navigation">
                        <NuxtLink class="footer__nav-link" to="/service-terms">
                            Порядок оформления, сроки исполнения услуги и условия оплаты
                        </NuxtLink>

                        <NuxtLink class="footer__nav-link" to="/legal-rules">
                            Политика обработки персональных данных
                        </NuxtLink>
                    </nav>
                </div>
            </div>
        </div>
    </footer>
</template>
