// screens/UserScreen.js

import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, Button, TouchableOpacity, ScrollView, ActivityIndicator, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from '../database/firebaseDb';
import GetLocation from 'react-native-get-location';
import MapView from 'react-native-maps'
import { LinearGradient } from "expo-linear-gradient";
import Moment from 'moment';



const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});
class QuestionDetailsScreen extends Component {

    constructor() {
        super();
        this.dbRef = firebase.firestore().collection('users');
        this.state = {
            description: "",
            geopoint: new firebase.firestore.GeoPoint(-23.198371, -45.886412),
            isLoading: true,
            descriptionArr: [],
            userDataArr: [],
        };
    }

    state = {
        location: null,
        loading: false,
    }

    componentDidMount() {
        const { email, quiz, question } = this.props.route.params;
        this.unsubscribe = this.dbRef.doc(email).collection("quiz").doc(quiz).collection("questions").doc(question).collection("answers").onSnapshot(this.getQuestionAnswer);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getQuestionAnswer = (querySnapshot) => {
        const descriptionArr = [];
        querySnapshot.forEach((res) => {
            const { description, registerDate, geopoint } = res.data();
            descriptionArr.push({
                key: res.id,
                res,
                description,
                registerDate,
                geopoint,
            });
        });
        this.setState({
            descriptionArr,
            isLoading: false,
        });
    }

    _requestLocation = () => {
        this.setState({ loading: true, location: null });
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 150000,
        })
            .then(location => {
                this.setState({
                    location,
                    loading: false,
                });
                this.addQuestion(location.latitude, location.longitude);
            })
            .catch(ex => {
                const { code, message } = ex;
                console.warn(code, message);
                if (code === 'CANCELLED') {
                    Alert.alert('Location cancelled by user or by another request');
                }
                if (code === 'UNAVAILABLE') {
                    Alert.alert('Location service is disabled or unavailable');
                }
                if (code === 'TIMEOUT') {
                    Alert.alert('Location request timed out');
                }
                if (code === 'UNAUTHORIZED') {
                    Alert.alert('Authorization denied');
                }
                this.setState({
                    location: null,
                    loading: false,
                });
            });
    }

    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    addQuestion(latitude, longitude) {
        const { email, quiz, question } = this.props.route.params;

        if (this.state.description === '') {
            alert('O campo precisa ser preenchido.')
        } else {
            this.setState({
                isLoading: true,
            });
            this.dbRef.doc(email).collection("quiz").doc(quiz).collection("questions").doc(question).collection("answers").doc(this.state.description.replace(/\s/g, "-")).set({
                description: this.state.description,
                registerDate: Date(),
                geopoint: new firebase.firestore.GeoPoint(latitude, longitude),
            }).then((res) => {
                this.setState({
                    user: email,
                    description: '',
                    isLoading: false,
                });
            })
                .catch((err) => {
                    console.error("Error found: ", err);
                    this.setState({
                        isLoading: false,
                    });
                });
        }
    }


    render() {
        const { email, quiz, question, questionNumber } = this.props.route.params;
        const { location, loading } = this.state;
        Moment.locale('pt-br');
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        }
        if (this.state.descriptionArr.length > 0) {
            return (

                <ScrollView style={styles.container}>

                    <View style={styles.questionsList}>
                        <View>
                            <LinearGradient
                                colors={["#33078a", "#B53471"]}
                                style={styles.questionNumberBox}
                                start={[0, 1]}
                                end={[1, 0]}>
                                <Text style={{ color: '#FFFFFF', fontWeight: "bold" }}>{questionNumber}</Text>
                            </LinearGradient>
                        </View>
                        <View style={{ marginLeft: 10, flex: 1 }}>
                            <Text style={{ color: '#555555', fontWeight: 'bold', fontSize: 16 }}>
                                {question}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "column", borderBottomColor: "#DDD", borderBottomWidth: 1 }}>
                        <View style={{ marginTop: 25 }}>
                            <Text style={{ color: "#333333", fontSize: 16, fontWeight: "bold" }}>Resposta: </Text>
                        </View>

                        <View style={styles.answerBox}>
                            {
                                this.state.descriptionArr.map((item, i) => {
                                    return (
                                        <View>
                                            <Text>
                                                {item.description}
                                            </Text>
                                        </View>

                                    );
                                })
                            }

                            {
                                this.state.descriptionArr.map((item, i) => {
                                    return (

                                        <View style={styles.mapBox}>
                                            <View>
                                                <Text>
                                                    <Text style={{ color: "#333333", fontSize: 14, fontWeight: "bold" }}>Local da Resposta
                                    <Text style={{ color: "#999999", fontSize: 12 }}>({item.geopoint.latitude}, {item.geopoint.longitude})</Text>
                            : </Text>
                                                </Text>
                                            </View>
                                            <MapView
                                                style={styles.map}
                                                region={{ latitude: item.geopoint.latitude, longitude: item.geopoint.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
                                                showsUserLocation={true}
                                            />
                                        </View>

                                    );
                                })
                            }

                            {
                                this.state.descriptionArr.map((item, i) => {
                                    return (

                                        <View style={{flexDirection: "row", justifyContent: "flex-end", marginTop: 20}}>
                                            <Text style={{color: "#333333"}}>
                                                {"Respondida em " + Moment(item.registerDate).format('LL')}
                                            </Text>
                                        </View>

                                    );
                                })
                            }
                        </View>
                    </View>
                </ScrollView>
            );
        } else {
            return (
                <ScrollView style={styles.container}>
                    <View>
                        <View style={styles.questionsList}>
                            <View>
                                <LinearGradient
                                    colors={["#33078a", "#B53471"]}
                                    style={styles.questionNumberBox}
                                    start={[0, 1]}
                                    end={[1, 0]}>
                                    <Text style={{ color: '#FFFFFF', fontWeight: "bold" }}>{questionNumber}</Text>
                                </LinearGradient>
                            </View>
                            <View style={{ marginLeft: 10, flex: 1 }}>
                                <Text style={{ color: '#555555', fontWeight: 'bold', fontSize: 16 }}>
                                    {question}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: "column", borderBottomColor: "#DDD", borderBottomWidth: 1 }}>
                            <View style={{ marginTop: 25 }}>
                                <Text style={{ color: "#333333", fontSize: 16, fontWeight: "bold" }}>Responder Questão</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ flex: 1 }}>
                                    <TextInput
                                        multiline={true}
                                        numberOfLines={4}
                                        style={styles.inputGroup}
                                        placeholder={"Digite sua resposta..."}
                                        placeholderTextColor="#666666"
                                        value={this.state.description}
                                        onChangeText={(val) => this.inputValueUpdate(val, 'description')}
                                    />
                                </View>

                                <View style={styles.addButton}>
                                    <TouchableOpacity
                                        onPress={this._requestLocation}>
                                        <Text style={styles.buttonText}>Responder</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    },
    mapBox: {
        marginTop: 25,
    },
    map: {
        marginTop: 5,
        height: 200,
        flex: 1,
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    inputGroup: {
        height: 40,
        padding: 7,
        paddingTop: 9,
        marginTop: 5,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#29007a",
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        fontSize: 16,
    },
    addButton: {
        backgroundColor: "#29007a",
        height: 40,
        paddingTop: 7,
        marginTop: -10,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
    buttonText: {
        marginHorizontal: 7,
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFFFFF"
    },
    questionsList: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#DDDDDD",
    },
    questionNumberBox: {
        borderRadius: 7,
        height: 30, width: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    answerBox: {
        padding: 20,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default QuestionDetailsScreen;