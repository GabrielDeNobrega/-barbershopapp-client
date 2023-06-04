export interface Service {
    id: number;
    currentPrice: number;
    name: string,
    duration: number,
    kindOfCare: string,
    active: boolean,
    createdAt: string,
}

export enum kindOfCare {
    BEARD = "Beard",
    HAIR = "Hair",
    BEARD_HAIR = "Beard and Hair"
}