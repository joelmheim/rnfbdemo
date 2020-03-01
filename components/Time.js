import React from "react";
import { StyleSheet } from 'react-native';
import BaseText from "./BaseText";
import { human } from 'react-native-typography';


const styles = StyleSheet.create({
    time: {
        fontSize: 200,
        fontWeight: 'bold',
        lineHeight: 230
    }
});

export default function Time(props) {
    return (
        <BaseText style={styles.time}>{props.time}</BaseText>
    );
}
