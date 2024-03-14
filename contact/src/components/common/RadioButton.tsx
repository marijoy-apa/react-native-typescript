import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import RadioElement from './RadioElement';

type RadioButtonTypes = {
    onSelectPhoneType: (value: string) => void,
    preselectedOption: string,
    options: string[]
}
// RadioButton component that displays a list of radio options
const RadioButton = (props: RadioButtonTypes) => {
    const { onSelectPhoneType, preselectedOption, options } = props
    const [selectedOption, setSelectedOption] = useState(preselectedOption);

    const handleOptionPress = (option: string) => {
        setSelectedOption(option);
        onSelectPhoneType(option);
    };

    return (
        <View >
            {options.map((option: string) => (
                <RadioElement
                    key={option}
                    value={option}
                    onSelect={handleOptionPress}
                    selectedOption={selectedOption}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
});

export default RadioButton;
