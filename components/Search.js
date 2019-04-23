'use strict'
import React, { Component } from 'react';
import {
  Text,
  TextInput,
  TouchableHighlight,
  StatusBar,
  WebView,
  FlatList,
  View
} from 'react-native';
import firebaseApp from './firebaseConfig.js';
import styles from './styles.js';

class Search extends Component {
  static navigationOptions = {
    title: 'Search',
    //header: null
  };

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View style={styles.roomsContainer}>
        <StatusBar barStyle="light-content"/>
        <View style={styles.roomsListContainer}>
            <WebView
                source={{uri: 'https://google.com'}}
                style={{marginTop: 20}}
            />
        </View>
      </View>
    );
  }
}

export default Search;
