import React, { Component } from "react";
import { Image, StyleSheet, TouchableOpacity, Text, TextInput, ScrollView, ActivityIndicator, View, SafeAreaView } from "react-native";
import firebase from "../database/firebaseDb";
import AgroCircularButton from "../components/AgroCircularButton";


class LoginScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection("users");
    this.state = {
      email: "",
      password: "",
      isLoading: false
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  loginUser() {
    this.state.email = "andre2020@agroquiz.com";
    this.state.password = "andre2020@agroquiz.com";
    if (this.state.email === "" || this.state.password === "") {
      alert("Por favor, preencha todos os campos.")
    } else {
      this.setState({
        isLoading: true,
      });
      this.props.navigation.navigate("HomeScreen", { email: this.state.email });
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
    return (
      <View style={styles.container}>

        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Image
            style={styles.logo}
            source={require("../../assets/logo.png")}
          />
        </View>

        <View style={{ marginTop: 150 }}>
          <View>
            <TextInput
              style={styles.inputGroup}
              multiline={true}
              numberOfLines={4}
              placeholder={"Email"}
              placeholderTextColor="#666666" 
              value={this.state.email}
              onChangeText={(val) => this.inputValueUpdate(val, "email")}
            />
            <TextInput
              style={styles.inputGroup}
              placeholder={"Digite sua Senha"}
              placeholderTextColor="#666666" 
              value={this.state.password}
              onChangeText={(val) => this.inputValueUpdate(val, "password")}
            />
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ color: "#33078a", fontSize: 18, fontWeight: "bold" }}>
              Acessar
            </Text>
            <AgroCircularButton
              onPress={() => this.loginUser()}
            />
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 50 }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("RegisterScreen")}>
            <Text style={{ color: "#333333", fontSize: 12 }}>
              Não possui uma conta? <Text style={{ color: "#33078a", fontWeight: "bold" }}>Cadastre-se</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logo: {
    height: 58,
  },
  inputGroup: {
    height: 30,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    fontSize: 16,
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

export default LoginScreen;