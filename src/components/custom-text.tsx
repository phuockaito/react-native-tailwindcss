import React from "react";
import { Text, TextProps, TextStyle } from "react-native";

interface CustomTextProps extends TextProps {
    style?: TextStyle;
}

export const CustomText: React.FC<CustomTextProps> = ({ children, style, ...rest }) => {
    return (
        <Text style={[{ fontFamily: "Glory", fontSize: 16 }, style]} {...rest}>
            {children}
        </Text>
    );
};
