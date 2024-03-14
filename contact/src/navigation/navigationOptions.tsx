import { Platform } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { MD3Colors, ThemeProp } from 'react-native-paper/lib/typescript/types';

const isIOS = Platform.OS === 'ios';

export const tabNavigatorOptions = (colors: MD3Colors) => ({
    headerShadowVisible: false,
    headerTintColor: colors.onPrimary,
    headerStyle: {
        backgroundColor: colors.background,
        borderBottomWidth: 0,
    },
    headerTitleAlign: 'center' as 'center',
    tabBarLabelStyle: {
        fontSize: 13,
        paddingBottom: isIOS ? 0 : 15,
    },
    tabBarStyle: {
        paddingTop: 10,
        height: isIOS ? 85 : 65,
        backgroundColor: colors.background,
        borderTopWidth: 0,
    },
});

export const tabContactListOptions = (
    {
        tabBarIcon: ({ color }: { color: any }) => (<FontAwesome
            name='phone'
            size={25}
            color={color} />)
    }
)

export const tabEmergencyListOptions = (
    {
        tabBarIcon: ({ color }: { color: any }) => (<MaterialIcons
            name='contact-emergency'
            size={25}
            color={color} />)
    }
)

export const stackNavigationOptions = (theme: ThemeProp) => {
    return (
        {
            headerShadowVisible: false,
            headerStyle:
                { backgroundColor: theme.colors ? theme.colors.background : undefined },
            cardStyle:
                { backgroundColor: theme.colors ? theme.colors.surface : undefined }
        }
    )
}