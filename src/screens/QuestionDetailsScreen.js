// screens/UserScreen.js

import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, Button, TouchableOpacity, ScrollView, ActivityIndicator, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from '../database/firebaseDb';
import GetLocation from 'react-native-get-location';
import MapView from 'react-native-maps'

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
                this.addQuestion(location.latitude, location.latitude);
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
        const { email, quiz, question } = this.props.route.params;
        const { location, loading } = this.state;
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

                    <MapView
                        style={{ flex: 1 }}
                        region={{ latitude: 42.882004, longitude: 74.582748, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
                        showsUserLocation={true}
                    />
                    <View style={styles.inputGroup}>
                        <Text>Bem-vindo, {email} {quiz} {question}</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AddQuizScreen', { email: email })}>
                            <Text style={{ color: 'blue' }}>
                                Criar Questionário
              </Text>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.descriptionArr.map((item, i) => {
                            return (
                                <ListItem
                                    key={i}
                                    chevron
                                    bottomDivider
                                    title={item.description}
                                    subtitle={"Xo dsahuasdhusad"}
                                    onPress={() => {
                                        this.props.navigation.navigate('QuizScreen', {
                                            email: email,
                                            quiz: item.quiz.replace(/\s/g, "-"),
                                        })
                                    }} />

                            );
                        })
                    }

                    {
                        this.state.descriptionArr.map((item, i) => {
                            return (
                                <MapView
                                    style={styles.map}
                                    region={{ latitude: item.geopoint.latitude, longitude: item.geopoint.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
                                    showsUserLocation={true}
                                />

                            );
                        })
                    }
                </ScrollView>
            );
        } else {
            return (
                <ScrollView style={styles.container}>
                    <View style={styles.inputGroup}>
                        <Text>Bem-vindo, {email} {quiz} {question}</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AddQuizScreen', { email: email })}>
                            <Text style={{ color: 'blue' }}>
                                Criar Questionário
          </Text>
                        </TouchableOpacity>

                        <View style={styles.inputGroup}>

                            <TextInput
                                multiline={true}
                                numberOfLines={4}
                                placeholder={'Descrição da Questão'}
                                value={this.state.description}
                                onChangeText={(val) => this.inputValueUpdate(val, 'description')}
                            />
                        </View>

                    </View>
                    <View style={styles.button}>
                        <Button
                            disabled={loading}
                            title="Adicionar"
                            onPress={this._requestLocation}
                        />
                    </View>
                    {loading ? (
                        <ActivityIndicator />
                    ) : null}
                    {location ? (
                        <Text style={styles.location}>
                            {location.latitude}
                            {location.longitude}
                        </Text>
                    ) : null}
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 22
    },
    map: {
        height: 200,
        width: 200,
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