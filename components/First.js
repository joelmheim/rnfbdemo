import React from "react";
import {StyleSheet, View} from "react-native";
import BaseText from "./BaseText";
import * as _ from 'lodash';

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 15,
        paddingTop: 0
    },
    text: {
        color: "lightgreen",
        fontSize: 80,
        lineHeight: 110,
    },
    time: {
        color: "lightgreen",
        fontSize: 150,
        lineHeight: 162,
    },
    remaining: {
        color: "red",
        fontSize: 150,
        lineHeight: 162,
    }
});

export default function First(props) {
    const remainStyle = (props.timeToGo > 5) ? styles.time : styles.remaining;
    return (
        <View style={styles.view}>
            <View>
                <BaseText style={styles.text}>{_.padStart(props.startNumber, 3 , " ")} {props.name && props.name.length > 20 ? props.firstName : props.name}</BaseText>
            </View>
            <View>
                <BaseText style={remainStyle}>{props.timeToGo}</BaseText>
            </View>
        </View>
    );
}
