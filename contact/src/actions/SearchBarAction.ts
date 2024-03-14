import { CLEAR_SEARCH_ITEM, SET_SEARCH_ITEM } from "./types"

export const setSearchItem = (value: string) => {
    return {
        type: SET_SEARCH_ITEM,
        payload: value
    }
}

export const clearSearchItem = () => {
    return {
        type: CLEAR_SEARCH_ITEM,
    }
}