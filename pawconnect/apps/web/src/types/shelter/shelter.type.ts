export interface ShelterImage {
    id: string;
    img: string;
}

export interface Shelter {
    id: string;
    name: string;
    address: string;
    addressDetail: string;
    phone: string;
    operatingHours: string;
    description: string;
    imgBanner: string;
    images: ShelterImage[];

    _count: {
        animals: number;
    };
}
