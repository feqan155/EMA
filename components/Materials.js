/*This is an example of File Picker in React Native*/
import React from 'react';
import firebase from './firebaseConfig.js';
import RNFetchBlob from 'react-native-fetch-blob'
import styles from './styles.js';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;


import {
    Alert,
    Text,
    View,
    Platform,
    Button,
    TouchableOpacity,
    Image, StatusBar, TextInput, TouchableHighlight, FlatList,
} from 'react-native';
import {
    DocumentPicker,
    DocumentPickerUtil,
} from 'react-native-document-picker';
import firebaseApp from "./firebaseConfig";
import Swipeout from "react-native-swipeout";

export default class Materials extends React.Component {
    constructor(props) {
        super(props);
        var firebaseDB = firebaseApp.database();
        this.db = firebaseDB;
        var storageRef = firebase.storage().ref('materials');
        this.storageRef = storageRef;
        this.filesRef = firebaseDB.ref('files');


        this.state = {
            user: '',
            files: [],
        };
    }

    componentDidMount() {
        this.listenForFiles(this.filesRef);
        this.setState({user: firebaseApp.auth().currentUser});
    }

    deleteFile(file) {
        console.log('deleted group', file)
        let fileRef = this.db.ref('files/' + file.key);
        fileRef.remove();
    }


    handleChange() {
        //Opening Document Picker
        DocumentPicker.show(
            {
                filetype: [DocumentPickerUtil.pdf()],
            },
            (error, res) => {

                const image = Platform.OS === 'ios' ? res.uri.replace('file://', '') : res.uri
                const uploadUri = image.split('raw%3A')[1].replace(/\%2F/gm, '/');

                let uploadBlob = null
                const imageRef = firebase.storage().ref('materials/' + res.fileName)
                let mime = 'application/octet-stream'
                fs.readFile(uploadUri, 'base64')
                    .then((data) => {
                        return Blob.build(data, {type: `${mime};BASE64`})
                    })
                    .then((blob) => {
                        uploadBlob = blob
                        return imageRef.put(blob, {contentType: mime})
                    })
                    .then((data) => {
                        uploadBlob.close()
                        console.log('upload blob', data.metadata.name)
                        this.filesRef.push({name: data.metadata.name})
                        return imageRef.getDownloadURL()
                    })
                    .then((url) => {
                        console.log('pdf filee', url)
                        return Promise.resolve(url)
                    })
                    .catch((error) => {
                        return Promise.reject(error)
                    })
            }
        );
    }


    getImage(image) {
        return this.storageRef.child(`${image}`).getDownloadURL().then((url) => {
            return Promise.resolve(url)
        }).catch((error) => {
            console.log('get image error', error)
        })
    }

    download(url) {
        var ext = this.extention(url);
        var date = new Date();

        let DownloadDir = fs.dirs.DownloadDir
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: DownloadDir + "/file_" + Math.floor(date.getTime() + date.getSeconds() / 2) + '.' + ext,
                mime: 'application/pdf',
                description: 'File downloaded by download manager.'
            }
        }

        RNFetchBlob
            .config(options)
            .fetch('GET', url, {
                //some headers ..
            })
            .then((res) => {
                // the temp file path
                Alert.alert("Success Downloaded");

                console.log('The file saved to ', res.path())
            })

    }

    extention(filename) {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
    }

    listenForFiles(filesRef) {
        filesRef.on('value', (dataSnapshot) => {
            var filesFB = [];
            dataSnapshot.forEach((child) => {
                filesFB.push({
                    name: child.val().name,
                    key: child.key
                });
            });
            this.setState({files: filesFB});
        });
    }

    renderRow(item) {
        let swipeBtns = [
            {
                text: 'Delete',
                backgroundColor: 'red',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                onPress: () => {
                    this.deleteFile(item)
                }
            },
            {
                text: 'Download',
                backgroundColor: 'gray',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                onPress: () => {
                    this.getImage(item.name)
                        .then(url => this.download(url))
                }
            }
        ];
        this.getImage(item.name)
        return (
            <Swipeout right={swipeBtns}
                      autoClose='true'
                      backgroundColor='transparent'>
                <TouchableHighlight style={styles.roomLi}
                                    underlayColor="#fff"
                                    onPress={() => console.log('open link here')}
                >
                    <Text style={styles.roomLiText}>{item.name}</Text>
                </TouchableHighlight>
            </Swipeout>
        )
    }

    render() {
        return (
            <View style={styles.filesContainer}>
                <StatusBar barStyle="light-content"/>
                {this.state.user.email === 'teacher@gmail.com' &&
                <View style={styles.roomsInputContainer}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{alignItems: 'center', paddingBottom: 20}}
                        onPress={this.handleChange.bind(this)}>
                        <Image
                            source={{
                                uri:
                                    'https://aboutreact.com/wp-content/uploads/2018/09/clips.png',
                            }}
                            style={styles.ImageIconStyle}
                        />
                        <Text style={{marginTop: 10}}>UPLOAD MATERIAL</Text>
                    </TouchableOpacity>
                </View>
                }
                <View style={styles.filesListContainer}>
                    <FlatList
                        data={this.state.files}
                        renderItem={({item}) => (this.renderRow(item)
                        )}
                    />
                </View>
            </View>
        );
    }
}