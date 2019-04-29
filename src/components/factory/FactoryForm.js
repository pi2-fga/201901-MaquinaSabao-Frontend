import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Picker, Body, Title, Text, Label, Button } from 'native-base';
import './global.js'

export default class FactoryForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quantity: '200',
      fragrance: '1'
    };
    this.submit = this.submit.bind(this)
  }

  set_quantity(value: string) {
    this.setState({
      quantity: value
    });
  }

  set_fragrance(value: string) {
    this.setState({
      fragrance: value
    });
  }

  submit(){
    this.props.set_screen('process')
    global.factory_screen = 'process'
  }

  render() {
    return (
      <Form>
        <Item picker>
          <Label>Quantidade:</Label>
          <Picker
            renderHeader
            mode="dropdown"

            selectedValue={this.state.quantity}
            onValueChange={this.set_quantity.bind(this)}
          >
            <Picker.Item label="200 ml" value="200" />
            <Picker.Item label="400 ml" value="400" />
            <Picker.Item label="800 ml" value="800" />
          </Picker>
        </Item>
        <Item picker>
          <Label>Fragrância:</Label>
          <Picker
            mode="dropdown"
            selectedValue={this.state.fragrance}
            onValueChange={this.set_fragrance.bind(this)}
          >
            <Picker.Item label="Sim" value="1" />
            <Picker.Item label="Não" value="0" />
          </Picker>
        </Item>
        <Container style={{ marginTop: '10%' }}>
          <Button block onPress={this.submit} >
            <Text>Iniciar</Text>
          </Button>
        </Container>
      </Form>
    );
  }
}
