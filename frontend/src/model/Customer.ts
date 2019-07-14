export type Status = "PROSPECTIVE" | "CURRENT" | "NON_ACTIVE";

export interface Customer {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    status: Status;
    creationDateTime: string;
}
