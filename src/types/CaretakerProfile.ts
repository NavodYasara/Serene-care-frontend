import { User } from "./User";

export interface CaretakerProfile extends User {
    nationalId: string;
    emergCont: string;
    category: string;
    mediCon: string;
    userId: string;
    address: string;
}
