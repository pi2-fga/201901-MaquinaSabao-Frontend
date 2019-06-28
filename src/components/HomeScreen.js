import React, { Component } from "react";
import { Container, Text, View } from "native-base";
import { Image, Dimensions } from 'react-native'

export default class HomeScreen extends Component {

  render() {

    return (
      <View>
        <Image
          style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height - 200}}
          source={require('../images/fundo.jpeg')}
        />
      </View>
    );
  }
}
