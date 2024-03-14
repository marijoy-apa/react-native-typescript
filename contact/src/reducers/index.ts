import { combineReducers } from "redux";
import ContactFormReducer from "./ContactFormReducer";
import ContactListReducer from './ContactListReducer'
import SearchItemReducer from "./SearchItemReducer";
import { ContactFormState, ContactListState } from "../actions/types";

// type RootState = {
//     contactForm: ContactFormState,
//     contactList: ContactListState,
//     searchKeyword: String
// }

export default combineReducers({
    contactForm: ContactFormReducer,
    contactList: ContactListReducer,
    searchKeyword: SearchItemReducer,
})


 