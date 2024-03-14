import React, { useEffect } from "react";
import { Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { contactFormUpdate, clearContactForm, updateContact, contactFormFillout, updateError } from '../actions'

import { useNavigation, useRoute } from "@react-navigation/native";
import ContactForm from "../components/createContactPage/ContactForm";
import SnackbarError from "../components/common/SnackbarError";
import { Contact } from "../actions/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { EditContactScreenProps, RootStackParamList } from "../navigation/types";
import { RootState } from "../store/store";

type propType = {
    contactList: Contact[],
    firstName: string;
    lastName: string;
    phone: { type: string; digit: string }[];
    notes: string;
    emergencyContact: Boolean;
    image: string | null;
    isValid: Boolean;
    isPopulated: Boolean,
    updateContact: any,
    contactFormFillout: any,
    clearContactForm: any,
}

const EditContactScreen = (props: propType) => {
    const { contactList,
        isValid,
        isPopulated,
        updateContact,
        contactFormFillout, 
        clearContactForm,
    } = props
    const id = useRoute<EditContactScreenProps['route']>().params.id
    const item = contactList.find(contact => contact.id === id)

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerBackTitleStyle: { fontSize: 14 },
            headerRight
        })

    }, [props])

    useEffect(() => {
        contactFormFillout(item);

        return () => {
            clearContactForm();
        }
    }, [isPopulated])

    const headerRight = () => (
        <TouchableOpacity disabled={!isValid} testID="on-save-button"
            onPress={() => {
                onSaveForm();
            }} >
            <Text style={{ color: isValid ? '#007AFF' : 'grey', marginRight: 10 }}>Save</Text>
        </TouchableOpacity>
    )

    const onSaveForm = async () => {
        const {
            firstName,
            lastName,
            phone,
            notes,
            emergencyContact,
            image,
        } = props
        const result = await updateContact({
            id,
            firstName,
            lastName,
            phone,
            notes,
            emergencyContact,
            image,
        })
        if (result.success) {
            navigation.pop(2)
        }
    }

    return (<>
        <ContactForm onError={updateError} />
        <SnackbarError />
    </>
    )
}

const mapStateToProps = (state: RootState) => {
    const { firstName, lastName, phone, notes, emergencyContact, image, isValid, isPopulated } = state.contactForm;
    return {
        contactList: state.contactList.list,
        firstName,
        lastName,
        phone,
        notes,
        emergencyContact,
        image,
        isValid,
        isPopulated,
    }
}

export default connect(mapStateToProps, { contactFormUpdate, clearContactForm, updateContact, updateError, contactFormFillout })(EditContactScreen)