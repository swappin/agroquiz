# AgroQuiz

Um aplicativo criado em 4 dias com React Native e Firebase desenvolvido em um desafio de criação de produtos da forma mais ágil com uma linguagem nunca antes utilizada. Obs.: As habilidades em React Native foram desenvolvidas uma semana apenas e isso inclui a criação do logo, da marca, etc. 

![alt text](https://raw.githubusercontent.com/swappin/agroquiz/master/files/agroquiz_arte_white.jpg?raw=true)


## Instalação

Para a instalação do app é necessário rodar os seguintes comandos através do Node:


Expo CLI: 
```bash
npm install -g expo-cli
```

Firebase: 
```bash
npm install firebase --save
```

React Navigation: 
```bash
npm install @react-navigation/native
```

Stack Navigator:

```bash
npm install @react-navigation/stack
```

React Native Elements: 
```bash
npm install react-native-elements
```

Native Maps: 
```bash
npm install --save react-native-maps
```

Expo Linear Gradient: 
```bash
expo install expo-linear-gradient
```

## Informações Extras

O aplicativo possui duas versões de Login e Registro, conforme imagens abaixo. 


![alt text](https://raw.githubusercontent.com/swappin/agroquiz/master/files/models.jpg?raw=true) 

Uma foi instalada para o Android e outra para o iOS. Para alterar as plataformas, basta alterar o operador ternário das seguintes linhas no arquivo App.js:



Linha 44: 
```bash
component={Platform.OS === 'ios' ? LoginIosScreen : LoginAndroidScreen}
```

Linha 52: 
```bash
component={Platform.OS === 'ios' ? RegisterIosScreen : RegisterAndroidScreen }
```
