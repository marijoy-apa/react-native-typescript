import React from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { connect } from "react-redux";
import { setSearchItem, clearSearchItem } from "../../actions";
import { useTheme } from "react-native-paper";
import { RootState } from "../../store/store";

type propType = {
    searchKeyword: string,
    setSearchItem: any,
    clearSearchItem: any
}
const SearchBar = (props: propType) => {
    const { colors } = useTheme();

    const onInputSearch = (value: string) => {
        props.setSearchItem(value)
    }

    const onPressCancelButton = () => {
        props.clearSearchItem()
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.primaryContainer }]}>
            <FontAwesome name="search" style={[styles.searchButton, { color: colors.primary }]} />
            <TextInput
                placeholder="Search"
                testID="search-input"
                style={[styles.textInput, { color: colors.primary }]}
                value={props.searchKeyword}
                onChangeText={onInputSearch}
                autoCorrect={false}
                placeholderTextColor={colors.primary}


            />
            {props.searchKeyword ? <TouchableOpacity onPress={onPressCancelButton} testID="clear-search-item">
                <Ionicons name="close-circle" style={[styles.xbutton, { color: colors.primary }]} />
            </TouchableOpacity> : null}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 18,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'lightgray',
        height: 50,
        borderRadius: 18,
        paddingHorizontal: 20
    },
    searchButton: {
        fontSize: 23,
        color: 'darkgrey'
    },

    textInput: {
        marginLeft: 20,
        flex: 1,
        // color: 'red'
        fontWeight: 'bold'
    },
    xbutton: {
        fontSize: 23,
        color: 'darkgrey'
    }

})


const mapStateToProps = (state: RootState) => {
    return { searchKeyword: state.searchKeyword }
}

export default connect(mapStateToProps, { setSearchItem, clearSearchItem })(SearchBar)