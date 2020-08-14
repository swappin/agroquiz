// screens/AddUserScreen.js

import React, { Component } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../database/firebaseDb';

import AgroButton from "../components/AgroButton";

class AddQuizScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection("users");
    this.state = {
      user: '',
      quiz: '',
      isLoading: false
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  addQuiz(email) {
    if (this.state.name === '') {
      alert('Fill at least your name!')
    } else {
      this.setState({
        isLoading: true,
      });
      this.dbRef.doc(email).collection("quiz").doc(this.state.quiz.replace(/\s/g, "-")).set({
        user: email,
        quiz: this.state.quiz,
        registerDate: Date(),
      }).then((res) => {
        this.setState({
          isLoading: false,
        });
        this.props.navigation.navigate('QuizScreen', {
          email: email,
          quiz: this.state.quiz.replace(/\s/g, "-"),
        })
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
    const { email } = this.props.route.params;
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <View style={{ alignItems: "center", marginBottom: 50 }}>
          <Image
            style={styles.logo}
            source={require("../../assets/logo_dark.png")}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            multiline={false}
            placeholder={"Digite o Título da Questionário"}
            placeholderTextColor="#666666"
            value={this.state.quiz}
            onChangeText={(val) => this.inputValueUpdate(val, 'quiz')}
          />
        </View>
        <View style={{ marginBottom: 35 }}>
          <AgroButton title="Criar Questionário" onPress={() => this.addQuiz(email)} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    padding: 35,
    justifyContent: "center",
  },
  inputGroup: {
    height: 40,
    padding: 7,
    paddingTop: 5,
    marginBottom: 35,
    borderWidth: 1,
    borderColor: "#29007a",
    borderRadius: 8,
    fontSize: 16,
  },
  buttonText: {
    marginHorizontal: 7,
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF"
  },
  logo: {
    width: 140,
    height: 85,
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

export default AddQuizScreen;