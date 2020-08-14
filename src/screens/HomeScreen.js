// screens/UserScreen.js

import React, { Component } from "react";
import { StyleSheet, Image, Text, TouchableOpacity, ScrollView, ActivityIndicator, View } from "react-native";
import { ListItem } from "react-native-elements";
import Moment from 'moment';


import firebase from "../database/firebaseDb";
import { LinearGradient } from "expo-linear-gradient";
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
        var quizImage = "";
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        }
        if (this.state.quizArr.length > 0) {
            return (
                <View style={styles.container}>
                    <ScrollView style={{ backgroundColor: "#FFFFFF" }}>
                        <View style={styles.header}>

                            {
                                this.state.userDataArr.map((item, i) => {
                                    return (
                                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                            <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>


                                                <LinearGradient
                                                    colors={["#EC00FF", "#A50A9A"]}
                                                    style={styles.avatarContainer}
                                                    start={[0, 1]}
                                                    end={[1, 0]}>
                                                    <Image
                                                        style={styles.avatar}
                                                        source={require("../../assets/default-avatar.jpg")}
                                                    />
                                                </LinearGradient>
                                                <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "bold", marginLeft: 8 }}>Bem-vindo,{"\n"}
                                                    <Text style={{ color: "#FACCFF", fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>
                                                </Text>
                                            </View>

                                            <View style={{ justifyContent: "center" }}>
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate("LoginScreen")}>
                                                    <Image
                                                        style={styles.icon}
                                                        source={require("../../assets/icons/logout.png")}
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
                                    <Text style={styles.listSubtitle}>Total de {this.state.quizArr.length} questionários criados</Text>
                                </View>

                                {
                                    this.state.quizArr.map((item, i) => {
                                        return (
                                            <ListItem
                                                key={i++}
                                                chevron
                                                bottomDivider
                                                title={item.quiz}
                                                titleStyle={{ color: '#29007a', fontWeight: 'bold' }}
                                                subtitle={"Criado em " + Moment(item.registerDate).format('LL')}
                                                subtitleStyle={{ fontSize: 14, color: "#333" }}
                                                leftAvatar={{ source: require("../../assets/arte.jpg") }}
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
        } else {
            return (
                <View style={styles.container}>
                    <ScrollView style={{ backgroundColor: "#FFFFFF" }}>
                        <View style={styles.header}>

                            {
                                this.state.userDataArr.map((item, i) => {
                                    return (
                                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                            <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>


                                                <LinearGradient
                                                    colors={["#EC00FF", "#A50A9A"]}
                                                    style={styles.avatarContainer}
                                                    start={[0, 1]}
                                                    end={[1, 0]}>
                                                    <Image
                                                        style={styles.avatar}
                                                        source={require("../../assets/default-avatar.jpg")}
                                                    />
                                                </LinearGradient>
                                                <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "bold", marginLeft: 8 }}>Bem-vindo,{"\n"}
                                                    <Text style={{ color: "#FACCFF", fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>
                                                </Text>
                                            </View>

                                            <View style={{ justifyContent: "center" }}>
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate("LoginScreen")}>
                                                    <Image
                                                        style={styles.icon}
                                                        source={require("../../assets/icons/logout.png")}
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

                                <View style={styles.emptyBox}>
                                    <Image
                                        style={styles.emptyImage}
                                        source={require("../../assets/empty.png")}
                                    />
                                    <Text style={styles.emptyTitle}>
                                        <Text style={{color: "#333"}}>Ooops... {"\n"}</Text>
                                        Nenhum questionário foi criado ainda.</Text>

                                </View>
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
        borderTopRightRadius: 35,
    },
    bottomBar: {
        backgroundColor: "#FFFFFF",
        padding: 35,
        paddingBottom: 70,
    },
    avatarContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center",
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
    emptyBox: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 100,
    },
    emptyImage: {
        width: 200,
        height: 200,
    },
    emptyTitle: {
        marginTop: 30,
        textAlign: "center",
        color: "#29007a",
        fontSize: 16,
        fontWeight: "bold",
    },
    listTitle: {
        color: "#29007a",
        fontSize: 16,
        fontWeight: "bold",
    },
    listSubtitle: {
        color: "#333333",
        fontSize: 12,
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