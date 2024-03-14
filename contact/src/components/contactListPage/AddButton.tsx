import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from "react-native-paper";

type propsType = {
    onPress: () => void
}


const AddButton = (props: propsType) => {
    const { onPress } = props
    const { colors } = useTheme()
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <View style={styles.container}>
                <MaterialIcons name="add-circle" style={styles.addCircle} />
                <Text style={{ color: colors.secondary }}>Add phone</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    button: {
        alignSelf: 'flex-start',
        paddingLeft: 20,
    },
    addCircle: {
        marginRight: 12,
        fontSize: 23,
        color: 'green'
    }
})


export default AddButton