import { FilterStatus } from "./FilterStatus";

export interface ItemProps {
    id: string;
    status: FilterStatus;
    description: string;
}