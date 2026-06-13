<template>
    <footer class="footer" id="section-contacts">
        <div class="container">
            <div class="footer__content">
                <ContactsMapSection />

                <div class="footer__info">
                    <p class="footer__inn">
                        <span>{{ $t('others.name') }}</span>
                        <span>{{ $t('others.inn') }}: 470518050729</span>
                    </p>

                    <nav class="footer__nav-links" aria-label="Footer navigation">
                        <NuxtLink class="footer__nav-link" :to="localePath('privacy')">
                            {{ $t('others.legal') }}
                        </NuxtLink>
                    </nav>
                </div>
            </div>
        </div>
    </footer>
</template>

<script lang="ts" setup>
const localePath = useLocalePath();
</script>
