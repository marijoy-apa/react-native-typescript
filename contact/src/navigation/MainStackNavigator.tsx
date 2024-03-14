
import { createStackNavigator } from '@react-navigation/stack';
import { stackNavigationOptions } from './navigationOptions';
import TabNavigator from './TabNavigator';
import ContactDetailsScreen from '../screens/ContactDetailsScreen';
import EditContactScreen from '../screens/EditContactScreen';
import CreateContactScreen from '../screens/CreateContactScreen';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

type navigationProp = {
    theme: ThemeProp
}

const MainStackNavigator = (prop: navigationProp) => {
    const { theme } = prop
    return (
        <Stack.Navigator initialRouteName='Contacts' screenOptions={stackNavigationOptions(theme)}>

            <Stack.Screen name="Contacts" component={TabNavigator} options={{ headerShown: false, }} />
            <Stack.Screen name="ContactDetails" component={ContactDetailsScreen} initialParams={{ id: '23' }} />
            <Stack.Screen name="EditContactScreen" component={EditContactScreen} />
            <Stack.Screen name="CreateContactScreen" component={CreateContactScreen} />
        </Stack.Navigator>
    )
}

export default MainStackNavigator;