import {
    CONTACT_FETCH_FAIL,
    CONTACT_FETCH_START,
    CONTACT_FETCH_SUCCESS,
    ContactListState,
} from '../actions/types'


const INITIAL_STATE: ContactListState = {
    list: [],
    isFetching: true,
    error: null,
}

export default (state: ContactListState = INITIAL_STATE, action: { type: String, payload: any }) => {
    switch (action.type) {
        case CONTACT_FETCH_SUCCESS:
            return { list: action.payload, isFetching: false, error: null }
        case CONTACT_FETCH_START:
            return { ...state, isFetching: true, error: null }
        case CONTACT_FETCH_FAIL:
            return { ...state, isFetching: false, error: 'Something went wrong. Please try again later.' }
        default:
            return state
    }
}