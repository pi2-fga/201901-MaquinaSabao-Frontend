import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Picker, Body, Title, Text, Label, Button } from 'native-base';


export default class Factory extends Component {

    constructor(props) {
    super(props);
    this.state = {
      quantity: '200',
      fragrance: '1'
    };
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

  }

  render() {
    return (
      <Container style={{ }}>
        <Title style={{ color: 'black', marginTop: '5%', marginBottom: '10%' }}>FABRICAÇÃO DE SABÃO</Title>
        <Content padder>
          <Form>
            <Item picker>
              <Label>Quantidade</Label>
              <Picker
                renderHeader
                mode="dropdown"
                style={{ width: undefined }}
                selectedValue={this.state.quantity}
                onValueChange={this.set_quantity.bind(this)}
              >
                <Picker.Item label="200 ml" value="200" />
                <Picker.Item label="400 ml" value="400" />
                <Picker.Item label="600 ml" value="600" />
              </Picker>
            </Item>
            <Item picker>
              <Label>Fragrancia</Label>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
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
        </Content>
      </Container>
    );
  }
}
