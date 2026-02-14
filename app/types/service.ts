type ServiceAttachment = {
    title: string,
    link: string
};

export type Service =  {
    img: string,
    title: string,
    content: string,
    price: string,
    actionTitle: string,
    details: string[],
    attachment: ServiceAttachment | null,
    modalActionButton: string,
    payLink: string
};