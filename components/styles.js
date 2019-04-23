'use strict';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    keyboardView: {
        flex: 1,
        backgroundColor: '#1E90FF'
    },
    authContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 60
    },
    appTitle: {
        color: '#fff',
        fontSize: 48,
        fontWeight: '200',
        marginBottom: 30
    },
    authInputLabel: {
        color: 'white',
        alignSelf: 'flex-start',
        marginLeft: 50
    },
    authTextInput: {
        height: 52,
        color: '#fff',
        fontSize: 20,
        textAlign: 'left',
        backgroundColor: '#1E90FF',
        borderBottomWidth: 2,
        marginBottom: 5,
        marginLeft: 50,
        marginRight: 50,
        borderBottomColor: '#fff'
    },
    authButton: {
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 3,
        borderRadius: 4,
        padding: 16,
        marginTop: 20,
    },
    authButtonText: {
        color: '#fff',
        fontSize: 20
    },
    authLowerText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 15,
        marginTop: 10
    },
    roomsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#1E90FF',
    },
    roomsHeader: {
        color: '#fff',
        fontSize: 28,
        top: 20
    },
    roomsInputContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomColor: '#f9f9f9',
        borderBottomWidth: 2,
        top: 30,
        bottom: 20,
    },
    filesContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    filesInputContainer: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomColor: '#ddd',
        borderBottomWidth: 2,
    },
    roomsInput: {
        flex: 1,
        height: 40,
        textAlign: 'center',
        fontSize: 18,
        color: '#1E90FF',
        borderColor: '#f9f9f9',
        borderWidth: 2,
        borderRadius: 4,
        margin: 10
    },
    roomsNewButton: {
        alignItems: 'center',
        marginRight: 20
    },
    roomsNewButtonText: {
        color: '#1E90FF',
        fontSize: 18
    },
    roomsListContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
        backgroundColor: '#fff'
    },
    filesListContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopColor: '#eee',
        borderColor: 'transparent',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
    },
    roomLi: {
        flex: 1,
        borderTopColor: '#eee',
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1,
        paddingLeft: 16,
        paddingTop: 14,
        paddingBottom: 16,
    },
    roomLiText: {
        color: '#1E90FF',
        fontSize: 22,
    },
    messagesHeader: {
        backgroundColor: '#1E90FF'
    },
    messagesTitle: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '400'
    },
    messagesBackTitle: {
        color: '#fff'
    },


    text: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 16,
        color: 'black',
    },
    ImageIconStyle: {
        height: 80,
        width: 80,
        resizeMode: 'stretch',
    },
});

export default styles;
