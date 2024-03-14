import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { FAB} from 'react-native-elements';
import { BottomSheet } from "@rneui/themed";
import { connect } from "react-redux";
import { contactFetch } from "../actions";

import initializeFirebaseApp from '../initializeFirebaseApp'
import NoContactsMessage from "../components/contactListPage/NoContactsMessage";
import NoSearchResult from "../components/contactListPage/NoSearchResult";
import ErrorMessage from "../components/contactListPage/ErrorMessage";
import SnackbarError from "../components/common/SnackbarError";
import SearchBar from '../components/contactListPage/SearchBar'
import ContactItem from '../components/contactListPage/ContactItem'
import CreateContactScreen from "./CreateContactScreen";
import { useTheme } from "react-native-paper";
import { RootState } from "../store/store";
import { Contact } from "../actions/types";

type ContactListProp = {
    contactList: Contact[],
    searchKeyword: string,
    isFetching: Boolean,
    error: string | null,
    contactFetch: any
}

const ContactListScreen = (props: ContactListProp) => {
    const { colors } = useTheme()
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false)

    const { contactList, searchKeyword, isFetching, error, contactFetch } = props
    useEffect(() => {
        initializeFirebaseApp();
        contactFetch();
    }, [])

    const renderItems = () => {
        if (isFetching) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator testID="activity-indicator" />
                </View>)
        } else if (error) {
            return (
                <ErrorMessage error={error} />)
        } else if (contactList.length === 0 && !searchKeyword) {
            return (
                <NoContactsMessage contactText="Contacts" />
            )
        } else if (contactList.length === 0) {
            return (
                <NoSearchResult searchKeyword={searchKeyword} />)

        }
        else {
            return (
                <FlatList
                    testID="contact-list"
                    data={contactList}
                    keyExtractor={(contact: Contact) => contact.id}
                    renderItem={({ item }) =>
                        <ContactItem item={item} />} />
            )
        }
    }

    const onCancelCreate = () => {
        setBottomSheetVisible(false)
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.surface }]}>
            <SearchBar />
            {renderItems()}

            <BottomSheet isVisible={bottomSheetVisible} >
                <CreateContactScreen onCancel={onCancelCreate} />
            </BottomSheet>

            <FAB testID="fab" color="grey" icon={{ name: 'add', color: 'white' }} placement="right" onPress={() => { setBottomSheetVisible(true) }} />
            <SnackbarError />

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',

    },
})



const mapStateToProps = (state: RootState) => {
    const filteredData: Contact[] = state.contactList.list.filter((item: Contact) => {
        const fullName = item.firstName.toLowerCase() + " " + item.lastName.toLowerCase();
        return fullName.includes(state.searchKeyword.toLowerCase()
        )
    })

    return {
        contactList: filteredData,
        searchKeyword: state.searchKeyword,
        isFetching: state.contactList.isFetching,
        error: state.contactList.error
    }
}

export default connect(mapStateToProps, { contactFetch })(ContactListScreen)