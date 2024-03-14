import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
    Contacts: undefined;
    ContactDetails: { id: string };
    EditContactScreen: { id: string };
    CreateContactScreen: undefined;
};

export type ContactsScreenProps = StackScreenProps<
    RootStackParamList,
    "ContactDetails"
>;


export type ContactDetailsScreenProps = StackScreenProps<
    RootStackParamList,
    "ContactDetails"
>;


export type EditContactScreenProps = StackScreenProps<
    RootStackParamList,
    "EditContactScreen"
>;
