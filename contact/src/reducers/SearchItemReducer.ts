import {
    CLEAR_SEARCH_ITEM,
    SET_SEARCH_ITEM
} from '../actions/types'

const INITIAL_STATE: string = ''

export default (state: string = INITIAL_STATE, action: { type: string, payload: string }) => {
    switch (action.type) {
        case SET_SEARCH_ITEM:
            return action.payload
        case CLEAR_SEARCH_ITEM:
            return INITIAL_STATE
        default:
            return state
    }
}