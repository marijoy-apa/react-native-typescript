//contact form
export const CONTACT_FORM_UPDATE = 'contact_form_update'
export const CREATE_NEW_CONTACT = 'create_new_contact'
export const CLEAR_CONTACT_FORM = 'clear_contact_form'
export const CONTACT_FORM_ERROR = 'contact_form_error'
export const CLEAR_CONTACT_FORM_ERROR = 'clear_contact_form_error'
export const CONTACT_FORM_VALIDATE = 'contact_form_validate'
export const CONTACT_FORM_FILLOUT = 'contact_form_fillout'

//contact list
export const CONTACT_FETCH_SUCCESS = 'contact_fetch_success'
export const CONTACT_FETCH_START = 'contact_fetch_start'
export const CONTACT_FETCH_FAIL = 'contact_fetch_fail'

//search input
export const SET_SEARCH_ITEM = 'set_search_item'
export const CLEAR_SEARCH_ITEM = 'clear_search_item'

export type Contact ={
    firstName: string;
    lastName: string;
    phone: { type: string; digit: string }[];
    notes: string;
    emergencyContact: Boolean;
    image: string | null;
    id: string;
}


export type ContactFormState = {
    firstName: string;
    lastName: string;
    phone: { type: string; digit: string }[];
    notes: string;
    emergencyContact: Boolean;
    image: string | null;
    isValid: Boolean;
    error: string | null;
    isPopulated: Boolean;
}

export type ContactListState = {
    list: Contact[],
    isFetching: Boolean,
    error: string | null,
}

