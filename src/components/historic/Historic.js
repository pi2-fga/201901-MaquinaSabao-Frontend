import React, { Component } from 'react';
import { Container, Header, Content, Text, Title, List, FlatList, ListItem, Right, Left, Button, View, Icon, Card, CardItem } from 'native-base';
import Modal from "react-native-modal";
import { TouchableOpacity, Image, ScrollView } from 'react-native'
import ExtraDimensions from 'react-native-extra-dimensions-android';


const list = [{id: 1, date: '12/01/2019', startTime: '12:42:30', endTime: '13:30:30', quantity: 2, prePh: 9, preViscosity: 4000, viscosity: 3000, ph: 8, quality:'boa', fragrance:'Sim'},
              {id: 2, date: '12/01/2019', startTime: '12:02:45', endTime: '12:42:60', quantity: 2, prePh: 9, preViscosity: 4000, viscosity: 3000, ph: 8, quality:'boa', fragrance:'Sim'},
              {id: 3, date: '11/01/2019', startTime: '12:50:10', endTime: '13:40:10', quantity: 2, prePh: 9, preViscosity: 4000, viscosity: 3000, ph: 8, quality:'boa', fragrance:'Sim'}]

export default class Historic extends Component {
  constructor(props){
    super(props)
    this.state = {
      modal: false,
      element: {},
      list: [],
    }
  }

  componentDidMount(){
    fetch('http://192.168.0.7:8000/manufacturing/', {
      method: 'get',
    }).then((response) => {
      console.log(response);
      return response.json();
    }).then((data) => {
      this.setState({list: data})
    });
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
          <Modal isVisible={this.state.modal} deviceHeight={ExtraDimensions.getRealWindowHeight()} deviceWidth={ExtraDimensions.getRealWindowWidth()}>
            <ScrollView style={{ flex: 1 }}>
              <Card>
                <CardItem>
                  <Left><Text>Data: </Text></Left>
                  <Right><Text>{this.state.element.date_of_manufacture}</Text></Right>
                </CardItem>
                <CardItem>
                  <Left><Text>Hora de inicio:</Text></Left>
                  <Right><Text>{this.state.element.start_of_manufacture}</Text></Right>
                </CardItem>
                <CardItem>
                  <Left><Text>Hora de fim: </Text></Left>
                  <Right><Text>{this.state.element.end_of_manufacture}</Text></Right>
                </CardItem>
                <CardItem>
                  <Left><Text>Quantidade de sabão:</Text></Left>
                  <Right><Text> {this.state.element.amount_of_soap}L</Text></Right>
                </CardItem>
                <CardItem>
                  <Left><Text>Ph previsto: </Text></Left>
                  <Right><Text>{this.state.element.expected_ph}</Text></Right>
                </CardItem>
                <CardItem>
                  <Left><Text>Ph: </Text></Left>
                  <Right><Text>{this.state.element.actual_ph}</Text></Right>
                </CardItem>
                <CardItem>
                  <Left><Text>Qualidade do óleo: </Text></Left>
                  <Right><Text>{this.state.element.oil_quality}</Text></Right>
                </CardItem>
                <CardItem>
                  <Left><Text>Fragrância: </Text></Left>
                  <Right><Text>{this.state.element.have_fragrance? 'Sim' : 'Não'}</Text></Right>
                </CardItem>
                <CardItem>
                  <Left><Text>Imagem do óleo:</Text></Left>
                  <Right>
                    <Image
                      style={{width: 100, height: 100}}
                      source={this.state.element.oil_image}
                    />
                  </Right>
                </CardItem>
                <Button block danger onPress={this.close_modal}>
                  <Icon name='md-close-circle-outline' style={{}}/>
                </Button>
              </Card>

            </ScrollView>
          </Modal>
          <List>
            {
              this.state.list.map( (element) => (
                  <ListItem onPress={() => this.open_modal(element)} key={element.id}>
                    <Left>
                      <Text>{element.date_of_manufacture}</Text>
                    </Left>
                    <Right>
                      <Text>{element.start_of_manufacture}</Text>
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
