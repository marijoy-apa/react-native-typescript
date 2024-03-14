import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons'
import { Snackbar } from 'react-native-paper';
import { connect } from 'react-redux';
import { clearFormError } from '../../actions';
import { useTheme } from 'react-native-paper';
import { Text } from 'react-native';
import { RootState } from '../../store/store';

type propType = {
    error: string,
    clearFormError: any
}

//Component that displays error message when there are form update errors
const SnackbarError = (props: propType) => {
    const { error, clearFormError } = props
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const { colors } = useTheme();

    //to show the Snackbar when there is a form error
    useEffect(() => {
        if (error) {
            setSnackbarVisible(true);
        }
    }, [error]);

    //dismiss the Snackbar and clear the form error
    const onDismissSnackbar = () => {
        setSnackbarVisible(false);
        clearFormError();
    }

    return (<Snackbar
        style={{ backgroundColor: colors.tertiaryContainer }}

        visible={snackbarVisible}
        onDismiss={onDismissSnackbar}
        duration={3000}
        action={{
            label: '',
            textColor: colors.primary,
            icon: (() => <Ionicons name="close-circle" color={colors.onTertiary} size={20} />),
            onPress: onDismissSnackbar,

        }} ><Text style={{ color: colors.onTertiary }}>{props.error}</Text>
    </Snackbar>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        error: state.contactForm.error,
    }
}

export default connect(mapStateToProps, { clearFormError })(SnackbarError);
