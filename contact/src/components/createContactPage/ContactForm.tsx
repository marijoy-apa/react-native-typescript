import React from "react";
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { connect } from 'react-redux';
import { contactFormUpdate, createContact, clearContactForm, updateError } from '../../actions'

import Textbox from '../common/Textbox'
import Spacer from '../common/Spacer';
import AddButton from '../contactListPage/AddButton'
import NumberInput from "./NumberInput";
import NotesInput from './NotesInput';
import AddEmergencyButton from './AddEmergencyButton';
import AddImage from './AddImage'
import { RootState } from "../../store/store";

type propsType = {
    firstName: string;
    lastName: string;
    phone: { type: string; digit: string }[];
    notes: string;
    emergencyContact: Boolean;
    image: string | null;
    isValid: Boolean;
    onCancel: any,
    contactFormUpdate: any
}

const ContactForm = (props: propsType) => {

    const { firstName,
        lastName,
        phone,
        notes,
        emergencyContact,
        image,
        isValid,
        onCancel,
        contactFormUpdate
    } = props

    //render the numberInput depending on the state of phone length of form
    const renderNumberInput = () => {
        const numberInputs = [];
        for (let index = 0; index < phone.length; index++) {
            numberInputs.push(<NumberInput
                key={index}
                onChangeNumber={onUpdatePhoneNumber}
                onChangePhoneType={onUpdatePhoneType}
                index={index}
                phoneInput={{
                    type: phone[index].type,
                    digit: phone[index].digit
                }} />
            )
        }
        return numberInputs;
    }

    const onUpdatePhoneType = (value: string, index: number) => {
        var newPhone: any = [...phone]

        newPhone[index] = { ...newPhone[index], type: value };
        contactFormUpdate({ prop: 'phone', value: newPhone })
    }

    const onUpdatePhoneNumber = (value: string, index: number) => {
        var newPhone: any = [...phone]
        newPhone[index] = { ...newPhone[index], digit: value };
        contactFormUpdate({ prop: 'phone', value: newPhone })
    }

    const onAddPhoneField = () => {
        var newPhone: any = [...phone, { type: 'Phone', digit: '' }]
        contactFormUpdate({ prop: 'phone', value: newPhone })
    }

    const onUpdateFirstName = (value: string) => {
        var newvalue = value.charAt(0).toUpperCase() + value.slice(1)
        contactFormUpdate({ prop: 'firstName', value: newvalue })
    }

    const onUpdateLastName = (value: string) => {
        var newvalue = value.charAt(0).toUpperCase() + value.slice(1)
        contactFormUpdate({ prop: 'lastName', value: newvalue })
    }

    const onUpdateNotes = (value: string) => {
        contactFormUpdate({ prop: 'notes', value })
    }

    const onUpdateIsEmergency = () => {
        contactFormUpdate({ prop: 'emergencyContact', value: !emergencyContact })
    }

    const onPickImage = (value: string) => {
        contactFormUpdate({ prop: 'image', value })
    }


    return (
        <View style={styles.bottomSheet}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" >
                <View style={styles.scrollContainer}>
                    <AddImage onPickImage={onPickImage} imageUrl={image} onError={updateError} />
                    <Textbox
                        keyboardType={undefined}
                        value={firstName}
                        placeholderText={"First Name"}
                        onChangeText={onUpdateFirstName} />
                    <Textbox
                        keyboardType={undefined}
                        value={lastName}
                        placeholderText={"Last Name"}
                        onChangeText={onUpdateLastName}
                    />
                    <Spacer style={{ height: 30 }} />
                    {renderNumberInput()}
                    <AddButton onPress={onAddPhoneField} />
                    <NotesInput onChangeText={onUpdateNotes} value={notes} />
                    <AddEmergencyButton onPress={onUpdateIsEmergency} isEmergency={emergencyContact} />
                </View>

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    bottomSheet: {
        borderStartEndRadius: 20,
        borderStartStartRadius: 20,
        flex: 1,
        width: '100%'
    },

    scrollContainer: {
        borderStartEndRadius: 20,
        borderStartStartRadius: 20,
        flex: 1,
        alignItems: 'center',
    },

    headerContainer: {
        borderStartEndRadius: 20,
        borderStartStartRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        width: '100%',
        height: 40,
        paddingHorizontal: 15
    }
})

const mapStateToProps = (state: RootState, ownProps: any) => {
    const { firstName, lastName, phone, notes, emergencyContact, image, isValid } = state.contactForm;
    return {
        firstName,
        lastName,
        phone,
        notes,
        emergencyContact,
        image,
        isValid,
        onCancel: ownProps.onCancel
    }
}

export default connect(mapStateToProps, { contactFormUpdate, createContact, clearContactForm, updateError })(ContactForm)