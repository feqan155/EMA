'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import firebaseApp from './firebaseConfig.js';

class SignUp extends Component {
    static navigationOptions = {
        title: 'SignUp',
        header: null
    };

    constructor(props) {
        super(props)
        this.state = {
            userEmail: '',
            userPassword: ''
        }
    }

    async signUp() {
        if (this.state.userEmail != '' && this.state.userPassword != '') {
            try {
                await firebaseApp.auth().createUserWithEmailAndPassword(this.state.userEmail, this.state.userPassword);
                console.log(this.state.userEmail + ' signed up');
                this.props.navigation.navigate('SignIn');
            } catch (error) {
                console.log(error.toString());
                Alert.alert(error.toString());
            }
        }
        else {
            Alert.alert(
                'Invalid Sign Up',
                'The Email and Password fields cannot be blank.',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            )
        }
    }

    goToSignIn() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon}
                           source={{uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db'}}/>
                    <TextInput style={styles.inputs}
                               placeholder="Email Address"
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
                                    onPress={this.signUp.bind(this)}>
                    <Text style={styles.loginText}>Sign up</Text>
                </TouchableHighlight>

                <View style={styles.loginFooter}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={() => this.goToSignIn()}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                </View>
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
    }
});
export default SignUp;
