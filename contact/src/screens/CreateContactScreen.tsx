import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ToastAndroid, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux';
import { createContact, clearContactForm } from '../actions'
import ContactForm from "../components/createContactPage/ContactForm";
import { Snackbar } from 'react-native-paper'
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { RootState } from "../store/store";
const height = Dimensions.get('window').height;

type propType = {
    firstName: string;
    lastName: string;
    phone: { type: string; digit: string }[];
    notes: string;
    emergencyContact: Boolean;
    image: string | null;
    error: string | null;
    isValid: Boolean,
    onCancel: any,
    createContact: any,
    clearContactForm: any

}
const CreateContactScreen = (props: propType) => {
    const {
        firstName,
        lastName,
        phone,
        notes,
        emergencyContact,
        image,
        error,
        isValid,
        createContact,
        clearContactForm,
        onCancel } = props
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const { colors } = useTheme();

    const onSaveForm = async () => {
        console.log({
            firstName,
            lastName,
            phone,
            notes,
            emergencyContact,
            image,
        })
        const result = await createContact({
            firstName,
            lastName,
            phone,
            notes,
            emergencyContact,
            image,
        })
        console.log(result)
        if (!result.isSuccess) {
            setSnackbarVisible(true);
            return;
        }
        onCancel()
    }

    const onCancelForm = () => {
        clearContactForm();
        onCancel();

    }

    const onDismissSnackbar = () => {
        console.log('on dismiss snackbar')
        setSnackbarVisible(false);
    }

    return (
        <View style={styles.bottomSheet}>
            <View style={[styles.scrollContainer, { backgroundColor: colors.surface }]}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        onPress={onCancelForm}>
                        <Text style={styles.cancelLink}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity testID="on-save-button" disabled={!isValid}
                        onPress={onSaveForm}>
                        <Text style={{ color: isValid ? '#007AFF' : 'grey' }}>Done</Text>
                    </TouchableOpacity>
                </View>
                <ContactForm />
                <Snackbar
                    testID="snackbar-error"
                    visible={snackbarVisible}
                    onDismiss={onDismissSnackbar}
                    duration={3000}
                    action={{
                        label: "",
                        icon: (() => <Ionicons name="close-circle" color='grey' size={20} testID="close-snackbar-button" />),
                        onPress: onDismissSnackbar,

                    }}
                >
                    {error}
                </Snackbar>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomSheet: {
        borderStartEndRadius: 20,
        borderStartStartRadius: 20,
        height: height * 0.85,
        // backgroundColor: 'blue',
        flex: 1,
    },
    cancelLink: {
        color: '#007AFF'
    },

    scrollContainer: {
        borderStartEndRadius: 20,
        borderStartStartRadius: 20,
        // backgroundColor: 'blue',
        flex: 1,
        alignItems: 'center'
    },

    headerContainer: {
        borderStartEndRadius: 20,
        borderStartStartRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 40,
        paddingHorizontal: 15
    }
})

const mapStateToProps = (state: RootState, ownProps: any) => {
    const {
        firstName,
        lastName,
        phone,
        notes,
        emergencyContact,
        image,
    } = state.contactForm
    return {
        firstName,
        lastName,
        phone,
        notes,
        emergencyContact,
        image,
        error: state.contactForm.error,
        isValid: state.contactForm.isValid,
        onCancel: ownProps.onCancel,

    }
}

export default connect(mapStateToProps, { createContact, clearContactForm })(CreateContactScreen)