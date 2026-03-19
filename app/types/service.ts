type ServiceAttachment = {
    title: string;
    link: string;
};

export type Service = {
    actionTitle: string;
    attachment: ServiceAttachment | null;
    content: string;
    details: string[];
    img: string;
    key: string;
    modalActionButton: string;
    payLink: string;
    price: string;
    title: string;
};
