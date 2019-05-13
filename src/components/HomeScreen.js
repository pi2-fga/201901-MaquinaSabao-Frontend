import React, { Component } from "react";
import {TextInput} from 'react-native';
import Modal from 'react-native-modal'
import { Container, Content, Text,Card, CardItem, Button } from "native-base";

export default class HomeScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      modal: true,
      element: {},
      username: "",
    };

    this.open_modal = this.open_modal.bind(this);
    this.close_modal = this.close_modal.bind(this);
  }

  set_username(value: string){
    this.setState({
      username: value
    })
  }

  open_modal = (element) => {
    this.setState({
      modal: true,
      element: element,
    });
  }

  close_modal = () => {
    this.setState({
      modal: false
    });
  }


  render() {
    return (
      <Container>
        <Content>
          <Text>Bem vindo à Fábrica de Sabão, {this.state.username}</Text>

          <Modal isVisible={this.state.modal}>
              <Card>
                <CardItem>
                  <Text>Como é seu primeiro acesso ao nosso app, por favor, diga-nos como gostaria de ser chamado:</Text>
                </CardItem>
                
                <CardItem>
                  <TextInput onChangeText={(username) => this.set_username(username)}
                    placeholder="Name"
                    value={this.state.username}>
                  </TextInput>
                </CardItem>
              </Card>

              <Button success onPress={this.close_modal} style={{alignSelf: 'center'}}>
                <Text>Enviar</Text>
              </Button>

          </Modal>
          
        </Content>
      </Container>
    );
  }
}
