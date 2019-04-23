'use strict';
import React, {Component} from 'react';
import {
    Image,
    View,
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
} from 'react-native';
import firebaseApp from './firebaseConfig.js';

class SignIn extends Component {
    static navigationOptions = {
        title: 'SignIn',
        header: null
    };

    constructor(props) {
        super(props)
        this.state = {
            userEmail: 'teacher@gmail.com',
            userPassword: 'secret'
        }
    }

    async signIn() {
        if (this.state.userEmail != '' && this.state.userPassword != '') {
            try {
                await firebaseApp.auth().signInWithEmailAndPassword(this.state.userEmail, this.state.userPassword);
                console.log(this.state.userEmail + ' signed in');
                this.props.navigation.navigate('Home');
            } catch (error) {
                console.log(error.toString());
                Alert.alert(error.toString());
            }
        }
        else {
            Alert.alert(
                'Invalid Sign In',
                'The Email and Password fields cannot be blank.',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            )
        }
    }

    goToSignUp() {
        this.props.navigation.navigate('SignUp');
    }

    render() {
        const resizeMode = 'center';
        const bg = require('../assets/img/bg2.jpg');
        return (
            <View style={styles.container}>
                <Image style={styles.imgContainer} source={bg}>
                    <View style={{padding: 50}} >
                        <Text style={styles.welcome}>WELCOME TO EMA </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon}
                               source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
                        <TextInput style={styles.inputs}
                                   placeholder="Email"
                                   keyboardType="email-address"
                                   underlineColorAndroid='transparent'
                                   onChangeText={(text) => this.setState({userEmail: text})}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon}
                               source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
                        <TextInput style={styles.inputs}
                                   placeholder="Password"
                                   secureTextEntry={true}
                                   underlineColorAndroid='transparent'
                                   onChangeText={(text) => this.setState({userPassword: text})}
                        />
                    </View>

                    <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}
                                        onPress={this.signIn.bind(this)}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableHighlight>

                    <View style={styles.loginFooter}>
                        <Text style={{fontSize: 16, color: '#0d0d0d'}}>You don't have an account? </Text>
                        <TouchableOpacity onPress={() => this.goToSignUp()}>
                            <Text style={{fontSize: 16, color: '#0d0d0d'}}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </Image>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00b5ec',
    },
    imgContainer : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width:Dimensions.get('window').width,
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#FF4DFF",
    },
    loginText: {
        color: 'white',
    },
    loginFooter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 18
    },
    welcome: {
        flexDirection: 'row',
        color: '#0d0d0d',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 28,
        fontWeight: '900',
        padding: 18
    }
});

export default SignIn;
