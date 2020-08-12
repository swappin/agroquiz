// screens/AddUserScreen.js

import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../database/firebaseDb';

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
                this.props.navigation.navigate('UserScreen')
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
            <ScrollView style={styles.container}>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'Nome Completo'}
                        value={this.state.name}
                        onChangeText={(val) => this.inputValueUpdate(val, 'name')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        placeholder={'Endereço de Email'}
                        value={this.state.email}
                        onChangeText={(val) => this.inputValueUpdate(val, 'email')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'Senha'}
                        value={this.state.password}
                        onChangeText={(val) => this.inputValueUpdate(val, 'password')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'Confirmação de Senha'}
                        value={this.state.confirmPassword}
                        onChangeText={(val) => this.inputValueUpdate(val, 'confirmPassword')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title='Registrar'
                        onPress={() => this.registerUser()}
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

export default RegisterScreen;