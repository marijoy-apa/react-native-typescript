import React, { useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { connect } from "react-redux";
import { deleteContact, updateEmergencyContact } from "../../actions";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { RootState } from "../../store/store";
import { Contact } from "../../actions/types";
import { ContactDetailsScreenProps, ContactsScreenProps, RootStackParamList } from "../../navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";

type ContactProps = {
    item: Contact,
    contactList: Contact[],
    deleteContact: any,
    updateEmergencyContact: any
}

// ContactItem component renders a single contact item in the list
const ContactItem = (props: ContactProps) => {

    var { item, contactList, deleteContact, updateEmergencyContact } = props
    const { colors } = useTheme();
    // Retrieve contact details from the Redux state
    const contact = contactList.find(contact => contact.id === item.id)
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    if (!contact) {
        return null;
    }
    const fullName = (contact.firstName + " " + contact.lastName).slice(0, 25)

    const onPressDelete = () => {
        deleteContact({ id: contact.id })
    }

    const onPressEmergencyButton = () => {
        console.log('contactid', contact.id)
        console.log('contactEmergency', !contact.emergencyContact)

        updateEmergencyContact({ id: contact.id, emergencyContact: !contact.emergencyContact })
    }

    const onPressContactItem = () => {
        navigation.navigate('ContactDetails', { id: contact.id })
    }

    const renderEmergencyIcon = () => {
        contact.emergencyContact === true;
        return (
            <TouchableOpacity onPress={onPressEmergencyButton} testID={`emergency-button-${contact.id}`}>
                {contact.emergencyContact ? (
                    <MaterialIcons name="emergency" style={styles.isEmergency} testID={`emergency-icon-${contact.id}`} />
                ) : (
                    <Ionicons name="medical-outline" style={[styles.isNotEmergency, { color: colors.onSecondary }]} testID={`is-not-emergency-icon-${contact.id}`} />
                )}
            </TouchableOpacity>
        )
    }


    return (
        <TouchableOpacity onPress={onPressContactItem} testID={`contact-item-${contact.id}`}>
            <View style={[styles.container, { borderColor: colors.onSecondary }]}>
                <Text style={[styles.nameText, { color: colors.onSecondary }]}>{fullName}</Text>
                <View style={styles.iconContainer}>
                    {renderEmergencyIcon()}
                </View>
                <TouchableOpacity onPress={onPressDelete} testID={`delete-button-${contact.id}`}>
                    <View style={styles.iconContainer}>
                        <MaterialIcons
                            name="delete-outline"
                            style={[styles.icon, { color: colors.onSecondary }]} />
                    </View>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 45,
        borderBottomWidth: 0.3,

    },
    icon: {
        fontSize: 18,
        color: 'grey',
        marginHorizontal: 5
    },

    nameText: {
        flex: 1,
        color: 'grey'
    },
    xbutton: {
        fontSize: 23,
        color: 'grey',
    },
    isEmergency: {
        fontSize: 18,
        color: 'red'

    },
    isNotEmergency: {
        fontSize: 18,
        color: 'grey'

    },
    iconContainer: {
        padding: 10,
        paddingLeft: 5,
    }
})


const mapStateToProps = (state: RootState, ownProps: { item: Contact }) => {
    return {
        item: ownProps.item,
        contactList: state.contactList.list
    }
}

export default connect(mapStateToProps,
    {
        deleteContact,
        updateEmergencyContact,
    })
    (ContactItem)