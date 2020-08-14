import React, { useState } from "react";

import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

const AgroButton = ({ onPress, title }) => {
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
                <View style={{flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    <Image
                        style={styles.icon}
                        source={require("../../assets/icons/create.png")}
                    />
                    <Text style={styles.buttonText}>{title}</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
}



const styles = StyleSheet.create({
    buttonContainer: {
        alignSelf: 'stretch',
        height: 75,
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 37.5,
        paddingVertical: 15,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginLeft: 10
    },
    icon: {
        width: 22,
        height: 22,
    },
})

export default AgroButton;
