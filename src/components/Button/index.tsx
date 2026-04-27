import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { styles } from "./styles"

interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

export const Button = ({title, ...rest}: ButtonProps) => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8} {...rest}>
            <Text style={styles.text}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}
