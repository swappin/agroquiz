import React, { useState } from "react";

import {
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

const AgroCircularButton = ({ onPress }) => {
    const [task, updateTask] = useState("");
    const [tasks, updateTasks] = useState([]);

    const handleAdd = () => {
        updateTasks([...tasks, task]);
        updateTask("");
    }

    const handleRenderTask = ({ item }) => <Text>{item}</Text>;

    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient
                colors={["#33078a", "#B53471"]}
                style={styles.buttonContainer}
                start={[0, 1]}
                end={[1, 0]}
            >
                <Image
                    style={styles.icon}
                    source={require('../../assets/icons/go-arrow.png')}
                />
            </LinearGradient>
        </TouchableOpacity>
    );
}



const styles = StyleSheet.create({
    buttonContainer: {
        width: 75,
        height: 75,
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 37.5,
        padding: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    icon: {
        width: 30,
        height: 30,
    }
})

export default AgroCircularButton;
