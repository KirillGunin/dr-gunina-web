// themes/mytheme.js
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const CustomPreset = definePreset(Aura, {
    primitive: {
        olive: {
            50: '#5a7f2b',
            100: '#4a6826',
        },
        rose: {
            50: '#fffdfd',
            100: '#fdd1d6',
            200: '#ce7e84',
            300: '#552d33',
            400: '#472027',
        },
        gray: {
            50: '#f8f5ef',
            100: '#efebe4',
            200: '#e3ddd3',
            300: '#877f73',
        },
        green: {
            50: '#E9EDEC',
            100: '#D4DBD9',
            200: '#6A837A',
            300: '#2B4E41',
            400: '#223E34',
            500: '#111F1A',
            600: '#0C1713',
        },
        salomie: {
            50: '#FFFCF3',
            100: '#FFFAE8',
            200: '#FFEEAE',
            300: '#FFE88C',
            400: '#CCB970',
            500: '#665C38',
            600: '#4C452A',
        },
        merlin: {
            50: '#EBEAEA',
            100: '#D7D6D5',
            200: '#75716D',
            300: '#3B352F',
            400: '#2F2A25',
            500: '#171512',
            600: '#110F0E',
        },
        neutral: {
            50: '#F2F2F2',
            100: '#DADAD9',
            200: '#B6B6B4',
            300: '#868583',
            400: '#555451',
            500: '#25241F',
            600: '#0D0C07',
        },
        salmon: {
            50: '#FFF2EF',
            100: '#FFE6DF',
            200: '#FFA991',
            300: '#FF8562',
            400: '#CC6A4E',
            500: '#663527',
            600: '#4C271D',
        },
        brown: {
            50: '#F3ECE5',
            100: '#E7DACC',
            200: '#AB7E4C',
            300: '#874800',
            400: '#6C3900',
            500: '#361C00',
            600: '#281500',
        },
    },
    semantic: {
        colorScheme: {
            light: {
                surface: {
                    50: '{rose.50}',
                    100: '{amber.100}',
                    200: '{amber.200}',
                    300: '{amber.300}',
                    400: '{amber.400}',
                    500: '{amber.500}',
                    600: '{amber.600}',
                },
                primary: {
                    color: '{green.500}',
                },
            },
            dark: {
                surface: {
                    50: '{neutral.50}',
                    100: '{neutral.100}',
                    200: '{neutral.200}',
                    300: '{neutral.300}',
                    400: '{neutral.400}',
                    500: '{neutral.500}',
                    600: '{neutral.600}',
                    700: '{neutral.700}',
                    800: '{neutral.800}',
                    900: '{neutral.900}',
                    950: '{neutral.950}',
                },
                primary: {
                    color: '{rose.50}',
                },
            },
        },
    },
    components: {
        button: {
            colorScheme: {
                light: {
                    root: {
                        primary: {
                            background: '{neutral.600}',
                            color: '{rose.50}',
                            hoverBackground: '{salmon.300}',
                            hoverBorderColor: '{salmon.300}',
                            hoverColor: '{neutral.600}',
                        },
                        success: {
                            background: '{olive.50}',
                            color: '{rose.50}',
                            hoverBackground: '{olive.100}',
                            hoverBorderColor: '{olive.100}',
                            borderColor: '{olive.50}',
                        },
                        contrast: {
                            borderColor: '{green.500}',
                            color: '{neutral.500}',
                            background: '{salomie.300}',
                            hoverBackground: '{salomie.200}',
                            hoverColor: '{neutral.500}',
                        },
                    },
                    outlined: {
                        primary: {
                            borderColor: '{green.500}',
                            color: '{neutral.500}',
                            hoverBackground: '{salomie.300}',
                        },
                        success: {
                            borderColor: '{olive.50}',
                            color: '{neutral.500}',
                            hoverBackground: '{salomie.300}',
                        },
                        warn: {
                            borderColor: '{salmon.300}',
                            color: '{neutral.600}',
                            hoverBackground: '{salmon.300}',
                        },
                    },
                    text: {
                        primary: {
                            hoverBackground: '{salomie.300}',
                        },
                    },
                },
                dark: {
                    root: {
                        primary: {
                            background: '{rose.50}',
                            color: '{neutral.600}',
                            hoverBackground: '{salmon.300}',
                            hoverBorderColor: '{salmon.300}',
                            hoverColor: '{neutral.600}',
                        },
                    },
                    outlined: {
                        primary: {
                            borderColor: '{rose.50}',
                            color: '{rose.50}',
                            hoverBackground: '{neutral.700}',
                        },
                    },
                    text: {
                        primary: {
                            hoverBackground: '{neutral.700}',
                        },
                    },
                },
            },
        },
        popover: {
            colorScheme: {
                light: {
                    root: {
                        borderColor: '{green.50}',
                        color: '{neutral.700}',
                        background: '{rose.50}',
                    },
                },
                dark: {
                    root: {
                        borderColor: '{rose.50}',
                        color: '{rose.50}',
                        background: '{neutral.800}',
                    },
                },
            },
        },
        card: {
            colorScheme: {
                light: {
                    root: {
                        color: '{neutral.950}',
                    },
                },
                dark: {
                    root: {
                        color: '{rose.50}',
                    },
                },
            },
        },
    },
});

export default {
    preset: CustomPreset,
    options: {
        darkModeSelector: '.dark-mode',
        cssLayer: false,
    },
};
