import React from "react";
import { View, ViewStyle } from 'react-native'

type SpacerType = {
    style: ViewStyle
}
// Spacer component adds empty space with optional styling
const Spacer = (props: SpacerType) => {
    const { style } = props
    return (
        <View style={[style]}>
        </View>

    )
}

export default Spacer