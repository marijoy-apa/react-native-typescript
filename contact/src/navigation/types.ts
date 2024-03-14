import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
// import type {StackProp} from "@react-navigation/native"
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


export type CreateContactScreenProps = StackScreenProps<
    RootStackParamList,
    "CreateContactScreen"
>;

export type ContactDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ContactDetails'>;

export type ContactsTabParamList = {
    ContactList: NavigatorScreenParams<RootStackParamList>;
    EmergencyList: undefined
}

// export type ContactsScreenProps = StackScreenProps<
//     RootStackParamList,
//     "Contacts"
// >;


// export type ContactDetailsScreenProps = StackScreenProps<
//     RootStackParamList,
//     "ContactDetails"
// >;


// export type EditContactScreenProps = StackScreenProps<
//     RootStackParamList,
//     "EditContactScreen"
// >;


// export type CreateContactScreenProps = StackScreenProps<
//     RootStackParamList,
//     "CreateContactScreen"
// >;

