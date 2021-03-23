import React, { Component } from 'react';
import { Text, View, Button, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Home extends Component {
  state = {
    feeds: [],
    error: false
  }

  async componentDidMount() {
    let userString = await AsyncStorage.getItem('user');
    if (!userString) {
      this.setState({ error: true });
      return;
    }

    let user = JSON.parse(userString);
    fetch('http://10.0.2.2:8000/api/posts', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`, 
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
          this.setState({ error: true});
      } else {
          this.setState({ feeds: data.data});
      }
    })
    .catch((error) => {
        console.log('error')
        console.error(error);
    });
  }

  render() {
    return (
      <View style={style.container}>
        <View style={style.header}>
            <Text style={style.name}>Header</Text>
        </View>

        <ScrollView style={style.content}>
          {this.state.feeds.map((feed) => 
            <View style={style.post}>
              <View style={style.postHead}>
                <Text style={style.name}>{feed.user.name}</Text>
              </View>
              <Text style={style.postTxt}>{feed.post}</Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const style = {
  container: {
    paddingTop: 10,
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    backgroundColor: '#f7f7f7',
    height: 50,
    width: '100%'
  },
  logo: {
    height: 30,
    marginTop: 10,
    resizeMode: 'contain',
  },
  content: {
    width: '100%',
  },
  post: {
    width: '100%',
    margin: 10,
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    borderColor: '#e0e0e0',
    borderTopWidth: 1,
  },
  profile: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  postHead: {
    flex: 1, 
    flexDirection: 'row',
  },
  name: {
    paddingTop: 5,
    paddingLeft: 5,
    fontWeight: 'bold'
  },
  postTxt: {
    marginTop: 10,
    resizeMode: 'contain',
  },
  postImage: {
    marginTop: 10,
    height: 280,
    resizeMode: 'contain',
  }
}