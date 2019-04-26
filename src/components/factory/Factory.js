import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Picker, Body, Title, Text } from 'native-base';


export default class Factory extends Component {

    constructor(props) {
    super(props);
    this.state = {
      quantity: 'key1',
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

  render() {
    return (
      <Container>
        <Header>
         <Body>
           <Title>FABRICAÇÃO DE SABÃO</Title>
         </Body>
       </Header>
        <Content>
          <Form>
            <Item picker>
              <Picker
                renderHeader
                mode="dropdown"
                style={{ width: undefined }}
                selectedValue={this.state.quantity}
                onValueChange={this.set_quantity.bind(this)}
              >
                <Picker.Item label="Wallet" value="key0" />
                <Picker.Item label="ATM Card" value="key1" />
                <Picker.Item label="Debit Card" value="key2" />
                <Picker.Item label="Credit Card" value="key3" />
                <Picker.Item label="Net Banking" value="key4" />
              </Picker>
            </Item>
            <Item picker>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                selectedValue={this.state.fragrance}
                onValueChange={this.set_fragrance.bind(this)}
              >
                <Picker.Item label="Com" value="1" />
                <Picker.Item label="Sem" value="0" />
              </Picker>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
