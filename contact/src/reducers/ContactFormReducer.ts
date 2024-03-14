import {
    CLEAR_CONTACT_FORM,
    CLEAR_CONTACT_FORM_ERROR,
    CONTACT_FORM_ERROR,
    CONTACT_FORM_FILLOUT,
    CONTACT_FORM_UPDATE,
    CONTACT_FORM_VALIDATE,
    ContactFormState
} from "../actions/types";

const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    phone: [{ type: 'Phone', digit: '' }],
    notes: '',
    emergencyContact: false,
    image: null,
    isValid: false,
    error: null,
    isPopulated: false,
}

export default (state: ContactFormState = INITIAL_STATE, action: { type: String, payload: any }) => {
    switch (action.type) {
        case CONTACT_FORM_UPDATE:
            console.log('update action form')
            return { ...state, [action.payload.prop]: action.payload.value }
        case CLEAR_CONTACT_FORM:
            return INITIAL_STATE
        case CONTACT_FORM_FILLOUT:
            return { ...state, ...action.payload, isPopulated: true }
        case CLEAR_CONTACT_FORM_ERROR:
            return { ...state, error: null }
        case CONTACT_FORM_VALIDATE:
            return { ...state, isValid: action.payload }
        case CONTACT_FORM_ERROR:
            return { ...state, error: action.payload }
        default:
            return state;
    }
}