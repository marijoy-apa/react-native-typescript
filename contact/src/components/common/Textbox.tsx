import React from "react";
import { View, StyleSheet, TextInput, KeyboardType } from 'react-native'
import { useTheme } from "react-native-paper";

type propType = {
    placeholderText: string,
    value: string,
    onChangeText: (value: string) => void,
    keyboardType: KeyboardType | undefined
}

const Textbox = (props: propType) => {
    const { placeholderText, value, onChangeText, keyboardType } = props
    const { colors } = useTheme();
    return (
        <View style={[styles.textContainer, { backgroundColor: colors.primaryContainer, borderColor: colors.primary }]}>
            <TextInput placeholder={placeholderText}
                keyboardType={keyboardType}
                value={value}
                onChangeText={onChangeText}
                autoCapitalize="none"
                autoCorrect={false}
                style={[styles.inputStyle, { color: colors.secondary }]} />
        </View>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        width: '100%',
        backgroundColor: 'lightgrey',
        height: 45,
        borderBottomWidth: 0.5,
        justifyContent: 'center',
        paddingLeft: 15,
        borderColor: 'darkgrey'
    },
    inputStyle: {
        width: '100%',
        height: '100%'
    }
})

export default Textbox