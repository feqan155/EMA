'use strict'
import React, {Component} from 'react';
import {
    Text,
    TextInput,
    TouchableHighlight,
    StatusBar,
    ListView,
    FlatList,
    View
} from 'react-native';
import firebaseApp from './firebaseConfig.js';
import styles from './styles.js';
import Swipeout from 'react-native-swipeout';


// Buttons
const swipeoutBtns = [
    {
        text: 'Button'
    }
]


class Rooms extends Component {
    static navigationOptions = {
        title: 'Rooms',
    };

    constructor(props) {
        super(props);
        var firebaseDB = firebaseApp.database();
        this.db = firebaseDB;
        this.roomsRef = firebaseDB.ref('rooms');
        this.messagesRef = firebaseDB.ref('messages');
        this.state = {
            user: '',
            rooms: [],
            newRoom: ''
        }
    }

    componentDidMount() {
        this.listenForRooms(this.roomsRef);
        this.setState({user: firebaseApp.auth().currentUser});
    }

    listenForRooms(roomsRef) {
        roomsRef.on('value', (dataSnapshot) => {
            var roomsFB = [];
            dataSnapshot.forEach((child) => {
                roomsFB.push({
                    name: child.val().name,
                    key: child.key
                });
            });
            this.setState({rooms: roomsFB});
        });
    }

    deleteGroup(group) {
      console.log('deleted group', group)
        let groupRef = this.db.ref('rooms/' + group.key);
        let messageRef = this.db.ref('messages/' + group.key);
        groupRef.remove();
        messageRef.remove();
    }

    addRoom() {
        if (this.state.newRoom === '') {
            return;
        }
        this.roomsRef.push({name: this.state.newRoom});
        this.setState({newRoom: ''});
    }

    openMessages(room) {
        this.props.navigation.navigate('Messages', {roomKey: room.key, roomName: room.name});
    }

    renderRow(item) {
        let swipeBtns = [{
            text: 'Delete',
            backgroundColor: 'red',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => {
                this.deleteGroup(item)
            }
        }];

        return (
            <Swipeout right={swipeBtns}
                      autoClose='true'
                      backgroundColor='transparent'>
                <TouchableHighlight style={styles.roomLi}
                                    underlayColor="#fff"
                                    onPress={() => this.openMessages(item)}
                >
                    <Text style={styles.roomLiText}>{item.name}</Text>
                </TouchableHighlight>
            </Swipeout>
        )
    }

    render() {
        return (
            <View style={styles.roomsContainer}>
                <StatusBar barStyle="light-content"/>
                {this.state.user.email === 'teacher@gmail.com' &&
                <View style={styles.roomsInputContainer}>
                    <TextInput
                        style={styles.roomsInput}
                        placeholder={"New Room Name"}
                        onChangeText={(text) => this.setState({newRoom: text})}
                        value={this.state.newRoom}
                    />

                    <TouchableHighlight style={styles.roomsNewButton}
                                        underlayColor="#fff"
                                        onPress={() => this.addRoom()}
                    >
                        <Text style={styles.roomsNewButtonText}>Create</Text>
                    </TouchableHighlight>

                </View>
                }
                <View style={styles.roomsListContainer}>
                    <FlatList
                        data={this.state.rooms}
                        renderItem={({item}) => (this.renderRow(item)
                        )}
                    />
                </View>
            </View>
        );
    }
}

export default Rooms;
