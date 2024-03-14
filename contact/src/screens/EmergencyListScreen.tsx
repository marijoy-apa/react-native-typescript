import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import SearchBar from '../components/contactListPage/SearchBar'
import ContactItem from '../components/contactListPage/ContactItem'
import { connect } from "react-redux";
import { contactFetch } from "../actions";
import NoContactsMessage from "../components/contactListPage/NoContactsMessage";
import NoSearchResult from "../components/contactListPage/NoSearchResult";
import ErrorMessage from "../components/contactListPage/ErrorMessage";
import SnackbarError from "../components/common/SnackbarError";
import { useTheme } from "react-native-paper";
import { RootState } from "../store/store";
import { Contact } from "../actions/types";

type propType = {
    contactList: Contact[],
    searchKeyword: string,
    error: string | null,
    isFetching: Boolean,
    contactFetch: any,
}
const EmergencyListScreen = (props: propType) => {
    const { contactList, searchKeyword, error, isFetching } = props
    const { colors } = useTheme()
    useEffect(() => {
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
                <NoContactsMessage contactText="Emergency Contacts" />
            )
        } else if (contactList.length === 0) {
            return (
                <NoSearchResult searchKeyword={searchKeyword} />)

        } else {
            return (
                <FlatList
                    testID="emergency-list"
                    data={contactList}
                    keyExtractor={(contact) => contact.id}
                    renderItem={({ item }) =>
                        <ContactItem item={item} />} />
            )
        }
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.surface }]}>
            <SearchBar />
            {renderItems()}
            <SnackbarError />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})


const mapStateToProps = (state: RootState) => {
    const filteredData: Contact[] = state.contactList.list.filter((item: Contact) => {
        const fullName = item.firstName.toLowerCase() + " " + item.lastName.toLowerCase();
        return fullName.includes(state.searchKeyword.toLowerCase()) && item.emergencyContact
    })

    return {
        contactList: filteredData,
        searchKeyword: state.searchKeyword,
        error: state.contactList.error,
        isFetching: state.contactList.isFetching,
    }
}

export default connect(mapStateToProps, { contactFetch })(EmergencyListScreen)