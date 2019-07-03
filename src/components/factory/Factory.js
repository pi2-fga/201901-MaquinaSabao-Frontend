import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Picker, Body, Title, Text, Label, Button } from 'native-base';
import FactoryForm from "./FactoryForm"
import FactoryProcess from "./FactoryProcess"
import './global.js'


export default class Factory extends Component {

    constructor(props) {
      super(props);
      this.state = {
        screen: global.factory_screen, // Screen can be main or process
      };
  }

  set_screen = (screen_aux) => {
    this.setState({screen: screen_aux})
  }

  render() {

    let factory_screen;

    if ( this.state.screen === 'main' ){
      factory_screen = <FactoryForm set_screen={this.set_screen}  alcohol={this.props.alcohol} oil={this.props.oil} soda={this.props.soda} wather={this.props.wather} essence={this.props.essence} set_response={this.props.set_response} set_request={this.props.set_request} feedback={this.props.feedback}/>
    }
    else if ( this.state.screen === 'process' ){
      factory_screen = <FactoryProcess set_screen={this.set_screen} temp={this.props.temp} set_response={this.props.set_response} feedback={this.props.feedback} soda={this.props.soda} conclusion_modal={this.props.conclusion_modal} close_conclusion_modal={this.props.close_conclusion_modal} amount_of_soap_request={this.props.amount_of_soap_request}/>
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
