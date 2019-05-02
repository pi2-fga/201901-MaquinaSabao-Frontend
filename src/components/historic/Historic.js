import React, { Component } from 'react';
import { Container, Header, Content, Text, Title, List, FlatList, ListItem, Right, Left, Button, View, Icon, Card, CardItem } from 'native-base';
import Modal from "react-native-modal";

const list = [{id: 1, date: '12/01/2019', time: '12:42:30'}, {id: 2, date: '12/01/2019', time: '12:02:45'}, {id: 3, date: '11/01/2019', time: '12:50:10'}]

export default class Historic extends Component {
  constructor(props){
    super(props)
    this.state = {
      modal: false,
      element: {},
    }
  }

  open_modal = (element) => {
    this.setState({
      modal: true,
      element: element,
    })
  }

  close_modal = () => {
    this.setState({
      modal: false
    })
  }

  render() {
    return (
      <Container>
      <Title style={{ color: 'black', marginTop: '5%', marginBottom: '10%' }}>HISTÓRICO DE FABRICAÇÕES</Title>
        <Content>
          <Header>
            <Left>
              <Text style={{color: 'white', marginLeft: '11%'}}>Data</Text>
            </Left>
            <Right>
              <Text style={{color: 'white'}}>Hora de inicio</Text>
            </Right>
          </Header>
          <Modal isVisible={this.state.modal}>
            <View style={{ flex: 1 }}>
              <Card>
                <CardItem>
                  <Text>Data: {this.state.element.date}</Text>
                </CardItem>
                <CardItem>
                  <Text>Hora de inicio: {this.state.element.time}</Text>
                </CardItem>
              </Card>
              <Button block danger onPress={this.close_modal}>
                <Icon name='md-close-circle-outline' style={{}}/>
              </Button>
            </View>
          </Modal>
          <List>
            {
              list.map( (element) => (
                  <ListItem onPress={() => this.open_modal(element)} key={element.id}>
                    <Left>
                      <Text>{element.date}</Text>
                    </Left>
                    <Right>
                      <Text>{element.time}</Text>
                    </Right>
                  </ListItem>
              ))
            }
          </List>
        </Content>
      </Container>
    );
  }
}
