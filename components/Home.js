import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';

export default class Example extends Component {
    static navigationOptions = {
        header: null
    };
    goToRoute(route) {
        this.props.navigation.navigate(route)
    }

    render() {
        const items = [
            {
                name: 'GROUPS',
                code: '#1abc9c',
                route: 'Rooms',
                icon: require('../assets/img/group.jpg')
            },
            {
                name: 'SEARCH BY GOOGLE',
                code: '#22a7f0',
                route: 'Search',
                icon: require('../assets/img/google.jpg')
            },
            {
                name: 'Materials',
                code: '#f7ca18',
                route: 'Materials',
                icon: require('../assets/img/materials.png')
            }
        ];

        return (
            <FlatGrid
                itemDimension={130}
                items={items}
                style={styles.gridView}
                // staticDimension={300}
                // fixed
                // spacing={20}
                renderItem={({item, index}) => (
                    <TouchableOpacity onPress={() => this.goToRoute(item.route)}>
                        <View style={[styles.itemContainer, {backgroundColor: item.code}]}>
                            <Image style={{width: 70, height: 70, flexDirection: 'row', alignItems: 'center'}}
                                   source={item.icon}/>
                            <Text style={styles.itemName}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        );
    }
}

const styles = StyleSheet.create({
    gridView: {
        marginTop: 20,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
});