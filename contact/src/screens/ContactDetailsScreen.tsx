import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image } from 'react-native';
import { connect } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import ContactIcons from "../components/contactDetailsPage/ContactIcons";
import PhoneNumbers from "../components/contactDetailsPage/PhoneNumbers";
import AddEmergencyButton from "../components/createContactPage/AddEmergencyButton";
import NotesDetails from "../components/contactDetailsPage/NotesDetails";
import { updateEmergencyContact, contactFormFillout, updateError } from "../actions";
import { TouchableOpacity } from "react-native-gesture-handler";
import SnackbarError from "../components/common/SnackbarError";
import { useTheme } from "react-native-paper";
import { RootState } from "../store/store";
import { Contact } from "../actions/types";
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { EditContactScreenProps, RootStackParamList } from "../navigation/types";

type ContactDetailsType = {
    contactList: Contact[],
    error: string,
    updateEmergencyContact: any,
    updateError: any
}
type ContactDetailsScreenProps = StackScreenProps<RootStackParamList, 'ContactDetails'>;


const ContactDetailsScreen = (props: ContactDetailsType) => {
    const { colors } = useTheme()
    var { contactList, error, updateEmergencyContact, updateError } = props
    //fetch id passed as parameter in navigation
    const id = useRoute<ContactDetailsScreenProps['route']>().params.id
    // const id = route.params.id;
    const item = contactList.find(contact => contact.id === id)

    if (!item) {
        return null;
    }
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        //set up Header right for Edit button component
        navigation.setOptions({
            headerTitle: '',
            headerBackTitleStyle: { fontSize: 14 },
            headerRight
        })
    }, [item])

    //Edit button component
    const headerRight = () => (
        <TouchableOpacity testID="edit-button"
            onPress={() => {
                navigation.navigate('EditContactScreen', { id: item.id });
            }}>
            <Text style={{ color: '#007AFF', marginRight: 12 }}>Edit</Text>
        </TouchableOpacity>
    )

    const renderContactNumber = () => {
        var contactDetail = []
        //render N number of PhoneNumbers component depending on phone.length, initial value is 1
        for (let index = 0; index < item.phone.length; index++) {
            var isLast = index === item.phone.length - 1
            const itemDetail = item.phone[index];
            contactDetail.push(<PhoneNumbers
                item={itemDetail}
                isLast={isLast}
                key={index} />)
        }
        return contactDetail;
    }

    // render Circular image for profile picture, if image is null, circular container with Name initial will be displayed
    const renderImage = () => {
        if (item.image) {
            return <Image testID="image-profile"
                source={{ uri: item.image }}
                style={[styles.imageStyle, { backgroundColor: colors.primaryContainer }]} />
        } else {
            return <View testID="empty-profile" style={[styles.imageContainer, { backgroundColor: colors.primaryContainer }]}>
                <Text style={[styles.textImage, { color: colors.primary }]}>{item.firstName[0]}</Text>
            </View>
        }
    }

    //updates the emergency property of the contact item in firebase
    const onPressEmergencyButton = () => {
        updateEmergencyContact({ id: item.id, emergencyContact: !item.emergencyContact })
    }

    return (
        <View style={styles.container}>
            {renderImage()}
            <Text testID="full-name" style={[styles.contactName, { color: colors.primary }]}>{item.firstName} {item.lastName}</Text>
            <ContactIcons phone={item.phone} onError={updateError} />
            <View style={[styles.contactNumContainer, { backgroundColor: colors.primaryContainer }]}>
                {renderContactNumber()}
            </View>
            <NotesDetails notes={item.notes} />
            <AddEmergencyButton isEmergency={item.emergencyContact} onPress={onPressEmergencyButton} />
            <SnackbarError />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    imageStyle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'lightgrey',
        marginVertical: 20,
        marginTop: 100,
    },
    contactNumContainer: {
        width: '100%',
        backgroundColor: 'lightgrey',
        borderRadius: 12,
    },
    contactName: {
        marginHorizontal: 80,
        textAlign: 'center',
        fontSize: 20,
    },
    imageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'lightgrey',
        marginVertical: 20,
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center'

    },
    textImage: {
        fontSize: 70,
        fontWeight: 'bold',
        color: 'grey'
    }
})

ContactDetailsScreen.options = {

    headerTitle: ''
}

const mapStateToProps = (state: RootState) => {
    return {
        contactList: state.contactList.list,
        error: state.contactForm.error,
    }
}



export default connect(mapStateToProps, { updateEmergencyContact, contactFormFillout, updateError })(ContactDetailsScreen)