export const useCookieAgreement = () => {
    const agreement = useCookie<'accept' | 'decline' | undefined>('cookie_agreement', {
        maxAge: 60 * 60 * 24 * 365, // год
        sameSite: 'lax',
        path: '/',
    });

    const setAgreement = (value: 'accept' | 'decline') => {
        agreement.value = value;
    };

    return { agreement, setAgreement };
};
