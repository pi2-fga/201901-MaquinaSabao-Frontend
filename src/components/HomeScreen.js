import React, { Component } from "react";
import { Container, Text, View } from "native-base";
import { Image } from 'react-native'

export default class HomeScreen extends Component {
  render() {
    return (
      <Container>
        <Image
          style={{width: "100%", height: "100%"}}
          source={require('./mainScreen/fundo.jpeg')}
        />
      </Container>
    );
  }
}
