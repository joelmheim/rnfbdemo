import React from "react";
import {StyleSheet, View} from 'react-native';
import BaseText from "./BaseText";
import * as _ from 'lodash';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 5
    },
    col: {
        borderColor: "red",
        borderStyle: "solid",
        borderWidth: 0
    },
    text: {
        fontSize: 40,
    },
    name: {
        textAlign: "left"
    }
});

export default function Next(props) {
    return props.participants.map(participant => {
            return (
                <View style={styles.row} key={participant.startNumber}>
                    <View style={styles.col}><BaseText style={styles.text}>{`${_.padStart(participant.startNumber, 3, " ")} ${participant.name.length > 20 ? participant.firstName : participant.name}`}</BaseText></View>
                    <View style={styles.col}><BaseText style={styles.text}>{participant.startTime.format( "HH:mm:ss")}</BaseText></View>
                </View>
            );
        });
}