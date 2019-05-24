import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Picker, Body, Title, Text, Label, Button } from 'native-base';
import FactoryForm from "./FactoryForm"
import FactoryProcess from "./FactoryProcess"
import './global.js'


export default class Factory extends Component {

    constructor(props) {
      super(props);
      this.state = {
        screen: global.factory_screen, // Screen can be main, process or end
      };
  }

  set_screen = (screen_aux) => {
    this.setState({screen: screen_aux})
  }

  render() {

    let factory_screen;

    if ( this.state.screen === 'main' ){
      factory_screen = <FactoryForm set_screen={this.set_screen}/>
    }
    else if ( this.state.screen === 'process' ){
      factory_screen = <FactoryProcess set_screen={this.set_screen}/>
    }

    return (
      <Container style={{ }}>
        <Title style={{ color: 'black', marginTop: '5%', marginBottom: '5%' }}>FABRICAÇÃO DE SABÃO</Title>
        <Content padder>
          {factory_screen}
        </Content>
      </Container>
    );
  }
}
