import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import firebase from '../database/firebaseDb';
import AgroButton from '../components/AgroButton';

class RegisterScreen extends Component {
    constructor() {
        super();
        this.dbRef = firebase.firestore().collection('users');
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            isLoading: false
        };
    }

    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    registerUser() {
        if (this.state.name === "" || this.state.email === "" || this.state.password === "" || this.state.confirmPassword === "") {
            alert('Por favor, preencha todos os campos.')
        } else if (this.state.password != this.state.confirmPassword) {
            alert('Ooops... A confirmação de password é diferente do password inserido.\nPor favor, verifique os campos')
        } else {
            this.setState({
                isLoading: true,
            });
            this.dbRef.doc(this.state.email).set({
                name: this.state.name,
                email: this.state.email,
                registerDate: Date(),
            }).then((res) => {
                this.setState({
                    isLoading: false,
                });
                this.props.navigation.navigate('LoginScreen')
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
                    <View style={{ padding: 25, paddingTop: 135, flex: 1, flexDirection: "column", justifyContent: "space-between" }}>
                        <View style={{
                            flex: 1,
                        }}>
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
                                        source={require("../../assets/icons/profile.png")}
                                    />
                                    <TextInput
                                        style={{ paddingLeft: 10 }}
                                        placeholder={"Nome Completo"}
                                        placeholderTextColor="#666666"
                                        value={this.state.name}
                                        onChangeText={(val) => this.inputValueUpdate(val, "name")}
                                        underlineColorAndroid="transparent"

                                    />
                                </View>
                                <View style={styles.inputGroup}>
                                    <Image
                                        style={styles.icon}
                                        source={require("../../assets/icons/email.png")}
                                    />
                                    <TextInput
                                        style={{ paddingLeft: 10 }}
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
                                        style={{ paddingLeft: 10 }}
                                        placeholder={"Digite sua Senha"}
                                        placeholderTextColor="#666666"
                                        value={this.state.password}
                                        secureTextEntry={true}
                                        onChangeText={(val) => this.inputValueUpdate(val, "password")}
                                    />
                                </View>
                                <View style={styles.inputGroup}>
                                    <Image
                                        style={styles.icon}
                                        source={require("../../assets/icons/password.png")}
                                    />
                                    <TextInput
                                        style={{ paddingLeft: 10 }}
                                        placeholder={"Confirme sua Senha"}
                                        placeholderTextColor="#666666"
                                        value={this.state.confirmPassword}
                                        secureTextEntry={true}
                                        onChangeText={(val) => this.inputValueUpdate(val, "confirmPassword")}
                                    />
                                </View>
                            </View>

                            <View style={{ marginTop: 30 }}>
                                <AgroButton
                                    title="Registrar"
                                    onPress={() => this.registerUser()}
                                />

                                <View style={styles.footer}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("LoginScreen")}>
                                        <Text style={styles.footerText}>
                                            Já possui uma conta? <Text
                                                style={{
                                                    color: "#33078a",
                                                    fontWeight: "bold",
                                                }}>Realizar Login</Text>
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

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
    },
    body: {
        flex: 1,
        marginBottom: 120,
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
        height: 100,
    },
    footerText: {
        marginTop: 45,
        color: "#333333",
        fontSize: 10,
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

export default RegisterScreen;