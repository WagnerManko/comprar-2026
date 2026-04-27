import { FilterStatus } from "@/types/FilterStatus";
import { CircleDashed, CircleCheck } from "lucide-react-native";

interface StatusIconProps {
    status: FilterStatus
}

export const StatusIcon = ({ status }: StatusIconProps) => {
    return status === FilterStatus.DONE ? (
        <CircleCheck size={18} color="#2c46b1" />
    ) : (
        <CircleDashed size={18} color="#000" />
    )
}