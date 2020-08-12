// screens/AddUserScreen.js

import React, { Component } from 'react';
import { Button, StyleSheet, Text, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from '../database/firebaseDb';

class AddQuestionsScreen extends Component {
    
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection("users");
    this.state = {
      question: "",
      isLoading: false,
      email: "",
      quiz: "",
    };
    this.state = {
      isLoading: true,
      userArr: []
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  addQuestion(email, quiz) {
    if(this.state.question === ''){
     alert('O campo precisa ser preenchido.')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.doc(email).collection("quiz").doc(quiz).collection("questions").doc(this.state.question).set({
        question: this.state.question,
        registerDate: Date(),
      }).then((res) => {
        this.setState({
          user: email,
          question: '',
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

  componentDidMount() {
    const { email, quiz } = this.props.route.params;
    this.unsubscribe = this.dbRef.doc(email).collection("quiz").doc(quiz).collection("questions").onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { question, registerDate } = res.data();
      userArr.push({
        key: res.id,
        res,
        question,
        registerDate,
      });
    });
    this.setState({
      userArr,
      isLoading: false,
   });
  }

  render() {
    const { email, quiz } = this.props.route.params;
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
        <Text>Questionário: {quiz}</Text>

          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Descrição da Questão'}
              value={this.state.question}
              onChangeText={(val) => this.inputValueUpdate(val, 'question')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Inserir Questão'
            onPress={() => this.addQuestion(email, quiz)} 
            color="#19AC52"
          />
          <Button
            title='Concluir'
            onPress={() => 
                this.props.navigation.navigate('HomeScreen', {email: email})} 
            color="#19AC52"
          />
        </View>

        {
            this.state.userArr.map((item, i) => {
              return (
                <ListItem
                  key={i}
                  chevron
                  bottomDivider
                  title={item.question}
                  subtitle={item.registerDate}
                  onPress={() => {
                    this.props.navigation.navigate('UserDetailScreen', {
                      userkey: item.key
                    });
                  }}/>
              );
            })
          }
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

export default AddQuestionsScreen;