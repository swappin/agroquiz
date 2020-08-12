// screens/AddUserScreen.js

import React, { Component } from 'react';
import { Button, StyleSheet, Text, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../database/firebaseDb';

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
    if(this.state.name === ''){
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
        this.props.navigation.navigate('AddQuestionsScreen', { 
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
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>

        <Text>{email} </Text>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Título do Questionário'}
              value={this.state.quiz}
              onChangeText={(val) => this.inputValueUpdate(val, 'quiz')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Criar Questionário'
            onPress={() => this.addQuiz(email)} 
            color="#19AC52"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
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