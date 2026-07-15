export type SpeedDialItem = {
    icon: string;
    label: string;
    command: () => void;
    href?: string;
};
