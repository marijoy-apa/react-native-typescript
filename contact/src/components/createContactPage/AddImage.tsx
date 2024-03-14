import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { requestCameraPermissionsAsync, CameraType, launchCameraAsync } from 'expo-image-picker';
import { useTheme } from "react-native-paper";

type propsType = {
    onPickImage: (value: string) => void,
    imageUrl: string | null,
    onError: (value: string) => void
}

const AddImage = (props: propsType) => {
    const { onPickImage, imageUrl, onError } = props
    const { colors } = useTheme()
    const handleCameraLaunch = async () => {
        try {
            await requestCameraPermissionsAsync()
            let result = await launchCameraAsync({
                cameraType: CameraType.front,
                quality: 1
            })

            if (!result.canceled) {
                onPickImage(result.assets[0].uri);
            }
        } catch (error) {
            console.log('error update')
            onError('Unable to use camera')
        }

    }
    const renderImage = () => {
        if (imageUrl) {
            return <Image style={[styles.imageStyle, { backgroundColor: colors.primaryContainer }]} source={{ uri: imageUrl }} />

        } else {
            return <View testID="empty-profile" style={[styles.imageContainer, { backgroundColor: colors.primaryContainer }]}>
            </View>
        }
    }

    return (
        <View>
            {/* <Image style={[styles.imageStyle, { backgroundColor: colors.primaryContainer }]} source={{ uri: imageUrl }} /> */}
            {renderImage()}
            <TouchableOpacity onPress={handleCameraLaunch}>
                <Text style={styles.addPhotoButton}>{imageUrl ? 'Change Photo' : 'Add Photo'}</Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    imageStyle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'lightgrey',
        marginVertical: 20,
    },
    addPhotoButton: {
        marginBottom: 30,
        color: '#007AFF',
        alignSelf: 'center'
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
})



export default AddImage