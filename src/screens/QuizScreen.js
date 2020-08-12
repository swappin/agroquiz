import React, { Component } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from '../database/firebaseDb';
import { LinearGradient } from "expo-linear-gradient";
import Moment from 'moment';


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
    if (this.state.question === '') {
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

  componentWillUnmount() {
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
    Moment.locale('pt-br');         // :|

    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View>

          <Text style={{ color: "#29007a", fontSize: 16, fontWeight: "bold" }}>Título do Questionário:{"\n"}
            <Text style={{ color: "#333333", fontSize: 20, fontWeight: "bold" }}>{quiz}</Text>
          </Text>
          <View style={{ flexDirection: "column", borderBottomColor: "#DDD", borderBottomWidth: 1 }}>
            <View style={{marginTop: 25}}>
              <Text style={{ color: "#333333", fontSize: 16, fontWeight: "bold" }}>Adicionar Nova Questão</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flex: 1 }}>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  style={styles.inputGroup}
                  placeholder={"Digite o Título da Questão"}
                  placeholderTextColor="#666666"
                  value={this.state.question}
                  onChangeText={(val) => this.inputValueUpdate(val, 'question')}
                />
              </View>

              <View style={styles.addButton}>
                <TouchableOpacity
                  onPress={() => this.addQuestion(email, quiz)}>
                  <Text style={styles.buttonText}>Adicionar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {
          this.state.userArr.map((item, i) => {
            return (
              <TouchableOpacity style={styles.questionsList}
                onPress={() => {
                  this.props.navigation.navigate('QuestionDetailsScreen', {
                    email: email,
                    quiz: quiz,
                    question: item.question,
                    questionNumber: i + 1,
                  });
                }}>

                <View>
                  <LinearGradient
                    colors={["#33078a", "#B53471"]}
                    style={styles.questionNumberBox}
                    start={[0, 1]}
                    end={[1, 0]}>
                    <Text style={{ color: '#FFFFFF', fontWeight: "bold" }}>{i + 1}</Text>
                  </LinearGradient>
                </View>
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <Text style={{ color: '#555555', fontWeight: 'bold', fontSize: 16 }}>
                    {item.question}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                  <Text style={{ color: '#29007a', fontSize: 16 }}>
                    >
                  </Text>
                </View>
              </TouchableOpacity>
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
    padding: 35,
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