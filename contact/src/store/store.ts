import { configureStore, combineReducers } from '@reduxjs/toolkit'
import ContactFormReducer from '../reducers/ContactFormReducer'
import ContactListReducer from '../reducers/ContactListReducer'
import SearchItemReducer from '../reducers/SearchItemReducer'

export const store = configureStore({
  reducer: combineReducers({
    contactForm: ContactFormReducer,
    contactList: ContactListReducer,
    searchKeyword: SearchItemReducer,
  }),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
