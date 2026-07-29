import type { Tag } from '~/types/tag';

type ServiceAttachment = {
    title: string;
    link: string;
};

export type Service = {
    service: string;
    actionTitle: string;
    attachment: ServiceAttachment | null;
    content: string;
    details: string[];
    img: string;
    price: string;
    title: string;
    tags: Tag[];
    actionUrl: string | null;
};
