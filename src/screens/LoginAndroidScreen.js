import React, { Component } from "react";
import { Image, ImageBackground, StyleSheet, TouchableOpacity, Text, TextInput, ScrollView, ActivityIndicator, View, SafeAreaView } from "react-native";
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

        <ImageBackground
          source={require("../../assets/background.png")}
          style={styles.image}>
          <View style={{ padding: 25, paddingTop: 100, flex: 1, flexDirection: "column", justifyContent: "space-between" }}>
            <View style={{}}>
              <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Image
                  style={styles.logo}
                  source={require("../../assets/logo_white_vertical.png")}
                />
              </View>
            </View>

            <View style={styles.body}>

              <View>
                <View style={styles.inputGroup}>
                  <Image
                    style={styles.icon}
                    source={require("../../assets/icons/email.png")}
                  />
                  <TextInput
                    placeholder={"Email"}
                    placeholderTextColor="#666666"
                    value={this.state.email}
                    onChangeText={(val) => this.inputValueUpdate(val, "email")}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Image
                    style={styles.icon}
                    source={require("../../assets/icons/password.png")}
                  />
                  <TextInput
                    placeholder={"Digite sua Senha"}
                    placeholderTextColor="#666666"
                    value={this.state.password}
                    secureTextEntry={true}
                    onChangeText={(val) => this.inputValueUpdate(val, "password")}
                  />
                </View>
              </View>

              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: "#33078a", fontSize: 16, fontWeight: "bold" }}>
                  Acessar sua conta
            </Text>
                <AgroCircularButton
                  onPress={() => this.loginUser()}
                />
              </View>

            </View>
            <View style={styles.footer}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("RegisterScreen")}>
                <Text style={styles.footerText}>
                  Não possui uma conta? <Text
                    style={{
                      color: "#33078a",
                      fontWeight: "bold",
                    }}>Cadastre-se</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  logo: {
    width: 120,
    height: 73,
  },
  icon: {
    width: 15,
    height: 15,
    opacity: 0.65,
    marginTop: 5,
    marginRight: 10,
},
  body: {
    marginTop: 100,
  },
  inputGroup: {
      flexDirection: "row",
      height: 30,
      padding: 0,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#CCCCCC",
      fontSize: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 50,
    height: 100,
  },
  footerText: {
    color: "#333333",
    fontSize: 10,
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