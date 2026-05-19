import type { Ref } from 'vue';
import { helpers, required, minLength, maxLength } from '@vuelidate/validators';
import { useI18n } from '#imports';

const customRules = {
    name: helpers.regex(/^[А-Яа-яЁё`'\s\-A-Za-z]+$/),
    email: helpers.regex(
        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/
    ),
    phone: helpers.regex(/^\d{10}$/),
    telegram: helpers.regex(/^[A-Za-z0-9_]+$/),
    moreThan: (min: number) =>
        helpers.withParams(
            { type: 'moreThan', min },
            (value: unknown) => !helpers.req(value) || Number(value) > min
        ),
    isTruthy: (value: unknown) => value === true,
};

export const validationMessages = (state?: Ref<Record<string, any>>) => {
    const { t } = useI18n();

    return {
        required: helpers.withMessage(() => t('errors.common.required'), required),
        name: helpers.withMessage(() => t('errors.common.name'), customRules.name),
        email: helpers.withMessage(() => 'Введите корректный email', customRules.email),
        minLength: (min: number) =>
            helpers.withMessage(() => `Минимум ${min} символов`, minLength(min)),
        maxLength: (max: number) =>
            helpers.withMessage(() => `Максимум ${max} символа`, maxLength(max)),
        phone: helpers.withMessage(() => t('errors.common.phone'), customRules.phone),
        telegram: helpers.withMessage(
            () => 'Поле может содержать только цифры, латинские буквы и знак "_" ',
            customRules.telegram
        ),
        moreThan: (min: number) =>
            helpers.withMessage(
                () => `${t('errors.common.mote-than')} ${min}`,
                customRules.moreThan(min)
            ),
        isTruthy: helpers.withMessage(
            () => t('errors.appointment.agreement'),
            customRules.isTruthy
        ),
        phoneOrTelegram: helpers.withMessage(
            () => t('errors.appointment.phone-or-telegram'),
            () => !!state?.value?.phone || !!state?.value?.telegram
        ),
    };
};
