import { GetState } from "@reduxjs/toolkit"
import ErrorMessage from "../components/contactListPage/ErrorMessage"
import { CLEAR_CONTACT_FORM, CLEAR_CONTACT_FORM_ERROR, CONTACT_FORM_ERROR, CONTACT_FORM_FILLOUT, CONTACT_FORM_UPDATE, CONTACT_FORM_VALIDATE, CREATE_NEW_CONTACT } from "./types"
import { getDatabase, push, ref, update, remove } from 'firebase/database'
import { Dispatch } from "redux"
import { AppDispatch, RootState } from "../store/store"
//updating a form property and validating the form
type ContactFormUpdateProp = {
    prop: String,
    value: any,
}


export const contactFormUpdate = (props: ContactFormUpdateProp) => {

    const { prop, value } = props
    return (dispatch: AppDispatch, getState: () => RootState) => {
        console.log('call dispatch update')
        dispatch({
            type: CONTACT_FORM_UPDATE,
            payload: { prop, value }
        })
        validateForm(dispatch, getState)
    }
}

//creating a new contact
type CreateContactProp = {
    firstName: string;
    lastName: string;
    phone: { type: string; digit: string }[];
    notes: string;
    emergencyContact: Boolean;
    image: string | null;
    id: string
}

export const createContact = (props: CreateContactProp) => {
    const { firstName, lastName, phone, notes, emergencyContact, image } = props
    return (dispatch: Dispatch) => {
        return new Promise((resolve) => {
            // filter out valid numbers
            const validPhoneNum = filterValidPhoneNumber(phone)
            const reference = ref(getDatabase(), 'contact-list');

            // Push/add new contact data to the database
            push(reference, { firstName, lastName, phone: validPhoneNum, notes, emergencyContact, image })
                .then(() => {
                    // console.log('i am called')

                    //dispatch and action to clear contact form
                    dispatch({ type: CLEAR_CONTACT_FORM })
                    resolve({ isSuccess: true })
                })
                .catch((error => {
                    console.log('Error on create new contact', error)

                    //dispatch an action to handle form creation error in firebase
                    dispatch({ type: CONTACT_FORM_ERROR, payload: 'Unable to create new contact.' })
                    resolve({ isSucess: false })
                }))
        })
    }
}
// updating an existing contact in Edit page (clicking save button)
export const updateContact = (props: CreateContactProp) => {
    const { firstName, lastName, phone, notes, emergencyContact, image, id } = props

    return (dispatch: Dispatch) => {
        return new Promise((resolve) => {
            const validPhoneNum = filterValidPhoneNumber(phone)
            const reference = ref(getDatabase(), `contact-list/${id}`);

            // Update contact data in the database
            update(reference, { firstName, lastName, phone: validPhoneNum, notes, emergencyContact, image })
                .then(() => {
                    // dispatch an action to clear the contact form
                    dispatch({ type: CLEAR_CONTACT_FORM })
                    resolve({ success: true })
                })
                .catch((error) => {
                    console.log('error on update contact', error)

                    //handle error
                    dispatchErrorWithTimeout(dispatch, 'Unable to update contact.')
                    resolve({ success: false })
                })
        })
    }
}

//updating emergency contact information in Contact List and emergency List screen

export const updateEmergencyContact = (props: CreateContactProp) => {
    console.log('update emergency contact1')
    const { id, emergencyContact } = props
    console.log(id, emergencyContact)
    return (dispatch: Dispatch) => {
        const reference = ref(getDatabase(), `contact-list/${id}`);
        console.log('update emergency contact')

        //update emergencyContact object in db
        update(reference, { emergencyContact })
            .catch((error) => {
                console.log('error on updating emergency contact', error)
                dispatchErrorWithTimeout(dispatch, 'Unable to update contact.')
            })
    }
}
//deleting contact in Contact List and emergency List screen

export const deleteContact = (props: CreateContactProp) => {
    const { id } = props
    return (dispatch: Dispatch) => {
        console.log('removing item', id)
        const reference = ref(getDatabase(), `contact-list/${id}`);
        remove(reference)
            .catch((error) => {
                console.log('error on deleting contact', error)
                dispatchErrorWithTimeout(dispatch, 'Unable to delete contact.')
            })
    }
}

export const clearContactForm = () => {
    return {
        type: CLEAR_CONTACT_FORM
    }
}


export const validateForm = (dispatch: Dispatch, getState: () => RootState) => {
    //get data from application state
    const { firstName, lastName, phone } = getState().contactForm;

    // checking if names are not empty and there is atlease one valid phone number
    const isValidName = firstName.trim() !== '' || lastName.trim() !== ''
    const isValidPhone = phone.some(((item: any) => item.digit.trim() !== ""
        && /^\d+$/.test(item.digit.trim())))

    const isValid = isValidName && isValidPhone

    dispatch({ type: CONTACT_FORM_VALIDATE, payload: isValid })
}

//fill out contact from with existing data for Edit Contact Screen
export const contactFormFillout = (item: any) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: CONTACT_FORM_FILLOUT,
            payload: item
        })
    }
}

//clearing form errors
export const clearFormError = () => {
    return {
        type: CLEAR_CONTACT_FORM_ERROR,
    }
}

//add error 
export const updateError = (payload: string) => {
    console.log('update error')
    return {
        type: CONTACT_FORM_ERROR,
        payload
    }
}

//helper function to filter out valid phone numbers from the list
const filterValidPhoneNumber = (phoneList: { type: string, digit: string }[]) => {
    const validList = phoneList.filter(item => {
        const isValidPhone = item.digit.trim() !== "" && /^\d+$/.test(item.digit.trim())
        return isValidPhone;
    })

    return validList;
}

// helper function to dispatch an error action with a timeout to clear the error after 3 secs
const dispatchErrorWithTimeout = (dispatch: Dispatch, errorMessage: string) => {
    console.log('i am called error')
    dispatch({ type: CONTACT_FORM_ERROR, payload: errorMessage });

    setTimeout(() => {
        dispatch({ type: CLEAR_CONTACT_FORM_ERROR })
    }, 4000);

}