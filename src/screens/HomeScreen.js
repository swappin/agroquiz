// screens/UserScreen.js

import React, { Component } from "react";
import { StyleSheet, Image, Text, TouchableOpacity, ScrollView, ActivityIndicator, View } from "react-native";
import { ListItem } from "react-native-elements";
import Moment from 'moment';


import firebase from "../database/firebaseDb";
import AgroButton from "../components/AgroButton";



class HomeScreen extends Component {

    constructor() {
        super();
        this.dbRef = firebase.firestore().collection("users");
        this.state = {
            isLoading: true,
            quizArr: [],
            userDataArr: [],
            loading: false,
        };
    }

    componentDidMount() {
        const { email } = this.props.route.params;
        this.unsubscribe = this.dbRef.doc(email).collection("quiz").onSnapshot(this.getQuizCollection);
        this.unsubscribe = this.dbRef.where("email", "==", email).onSnapshot(this.getUserData);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getQuizCollection = (querySnapshot) => {
        const quizArr = [];
        querySnapshot.forEach((res) => {
            const { quiz, registerDate } = res.data();
            quizArr.push({
                key: res.id,
                res,
                quiz,
                registerDate,
            });
        });
        this.setState({
            quizArr,
            isLoading: false,
        });
    }


    getUserData = (querySnapshot) => {
        const userDataArr = [];
        querySnapshot.forEach((res) => {
            const { email, name, registerDate } = res.data();
            userDataArr.push({
                key: res.id,
                res,
                email,
                name,
                registerDate,
            });
        });
        this.setState({
            userDataArr,
            isLoading: false,
        });
    }

    render() {
        const { email } = this.props.route.params;
        Moment.locale('pt-br');
        var quizImage = "https://i.pinimg.com/originals/38/4b/64/384b647cf8c97a0b8b42bb25f169747c.png"; 
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <ScrollView style={{ backgroundColor: "#FFFFFF" }}>
                    <View style={styles.header}>

                        {
                            this.state.userDataArr.map((item, i) => {
                                return (
                                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                                            <Image
                                                style={styles.avatar}
                                                source={require("../../assets/default-avatar.jpg")}
                                            />
                                            <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "bold", marginLeft: 8 }}>Bem-vindo,{"\n"}
                                                <Text style={{ color: "#d5b5ff", fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
                                            </Text>
                                        </View>

                                        <View style={{ justifyContent: "center" }}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate("LoginScreen")}>
                                                <Image
                                                    style={styles.icon}
                                                    source={require("../../assets/logout.png")}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                );
                            })
                        }
                    </View>
                    <View style={{ backgroundColor: "#5f27cd" }}>
                        <View style={styles.body}>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: "#DDD", marginBottom: 10, }}>

                            <Text style={styles.listTitle}>Meus Questionários</Text>
                            </View>

                            {
                                this.state.quizArr.map((item, i) => {
                                    return (
                                        <ListItem
                                            key={i}
                                            chevron
                                            bottomDivider
                                            title={item.quiz}
                                            titleStyle={{ color: '#29007a', fontWeight: 'bold' }}
                                            subtitle={"Criado em " + Moment(item.registerDate).format('LL')}
                                            subtitleStyle={{ fontSize: 14, color: "#333" }}
                                            leftAvatar={{ source: { uri: quizImage } }}
                                            chevron={{ color: '#333' }}

                                            onPress={() => {
                                                this.props.navigation.navigate("QuizScreen", {
                                                    email: email,
                                                    quiz: item.quiz.replace(/\s/g, "-"),
                                                })
                                            }}
                                            containerStyle={{
                                                paddingHorizontal: 0,
                                                paddingVertical: 20, // adds the rounded corners
                                                backgroundColor: '#fff'
                                            }}
                                        />
                                    );
                                })
                            }
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.bottomBar}>
                    <AgroButton title="Criar Questionário" onPress={() => this.props.navigation.navigate("AddQuizScreen", { email: email })} />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#5f27cd",
    },
    header: {
        padding: 35,
        backgroundColor: "#5f27cd",
    },
    body: {
        flexDirection: "column",
        padding: 35,
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35
    },
    bottomBar: {
        backgroundColor: "#FFFFFF",
        padding: 35,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 150 / 2,
        overflow: "hidden",
    },
    icon: {
        width: 22,
        height: 22,
    },
    listTitle: {
        color: "#29007a",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center"
    }
})

export default HomeScreen;