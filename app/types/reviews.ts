export type NewReview = {
    name: string;
    last_name: string;
    phone: string;
    text: string;
    rating: number;
    agreement: boolean;
};

export type Review = {
    id: number;
    name: string;
    last_name: string;
    text: string;
    rating: number;
    status: 'approved' | 'pending' | 'rejected';
    agreement: boolean;
    created_at: string;
    updated_at: string;
};
