import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Textbox from '../common/Textbox';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Dialog } from 'react-native-elements'
import RadioButton from "../common/RadioButton";
import { useTheme } from "react-native-paper";

type propType = {
    onChangePhoneType: (value: string, index: number) => void,
    onChangeNumber: (value: string, index: number) => void,
    index: number,
    phoneInput: { type: string; digit: string },
}

const NumberInput = (props: propType) => {
    const { onChangePhoneType, onChangeNumber, index, phoneInput } = props
    const [modalVisible, setModalVisible] = useState(false);
    const [isValidNumber, setIsValidNumber] = useState(true)
    const { colors } = useTheme()
    const showModal = () => {
        setModalVisible(true);
    };

    const numTypes = ['Mobile', 'Phone', 'Work', 'Main', 'Fax', 'Pager', 'Custom']

    const onSelectPhoneType = (value: string) => {
        onChangePhoneType(value, index)
        setModalVisible(false);
    }

    const onChangeText = (value: string) => {
        const isValidNumber = /^\d+$/.test(value.trim()) || value.trim() === ''
        setIsValidNumber(isValidNumber)
        onChangeNumber(value, index)
    }
    return (
        <View style={styles.parentContainer}>
            <View style={[styles.container, { backgroundColor: colors.primaryContainer, borderColor: colors.primary }]}>
                <TouchableOpacity style={styles.buttonContainer} onPress={showModal} testID="select-phone-type-button">
                    <View style={styles.dropdownContainer}>
                        <Text style={styles.textInput} testID="phone-type-label">
                            {phoneInput.type}
                        </Text>
                        <MaterialCommunityIcons
                            name="greater-than"
                            style={[styles.textInput, { fontSize: 15, }]} />
                    </View>
                </TouchableOpacity>
                <View style={styles.textboxContainer}>
                    <Textbox placeholderText={phoneInput.type} onChangeText={onChangeText} keyboardType="phone-pad" value={phoneInput.digit} />
                </View>
                <Dialog isVisible={modalVisible} testID="radio-types-modal" visible={modalVisible} onBackdropPress={() => { setModalVisible(false) }} overlayStyle={[styles.dialog, { backgroundColor: colors.onTertiary }]}>
                    <RadioButton onSelectPhoneType={onSelectPhoneType} preselectedOption={phoneInput.type} options={numTypes} />
                </Dialog>
            </View>
            {isValidNumber ? null : <Text style={styles.errorMessage}>Phone Number should only contain number</Text>}

        </View>

    )
}

const styles = StyleSheet.create({
    parentContainer: {
        width: '100%'
    },
    container: {
        backgroundColor: 'lightgrey',
        height: 45,
        borderBottomWidth: 0.5,
        justifyContent: 'center',
        paddingLeft: 15,
        borderColor: 'darkgrey',
        flexDirection: 'row'
    },
    inputStyle: {
        width: '100%'
    },
    buttonContainer: {
        flex: 2,
        justifyContent: 'center',
    },
    dropdownContainer: {
        height: '70%',
        flexDirection: "row",
        alignItems: 'center',
        borderRightWidth: 0.5,
        borderColor: 'darkgrey',
        justifyContent: 'space-between',
        paddingRight: 10,
    },
    textboxContainer: {
        flex: 6,
    },
    textInput: {
        fontSize: 12,
        color: 'darkgrey',
    },
    dialog: {
        backgroundColor: '#f1eeee',
        borderRadius: 23
    },
    errorMessage: {
        color: 'red',
        fontSize: 9,
        marginTop: 5,
        marginLeft: 135,
    }


})

export default NumberInput