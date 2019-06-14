import React, { Component } from 'react';
import { Container, Header, Content, Text, Title, List, FlatList, ListItem, Right, Left, Button, View, Icon, Card, CardItem } from 'native-base';
import Modal from "react-native-modal";
import { TouchableOpacity, Image, ScrollView } from 'react-native'
import ExtraDimensions from 'react-native-extra-dimensions-android';


export default class Historic extends Component {
  constructor(props){
    super(props)
    this.state = {
      modal: false,
      element:   {
          id: 1,
          start_of_manufacture: '',
          end_of_manufacture: '',
          amount_of_soap: '',
          expected_ph: '',
          actual_ph: '',
          oil_quality: '',
          have_fragrance: true,
          oil_image: ''
        },
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
                  <Right><Text>{this.state.element.start_of_manufacture.replace('-','/').replace('-','/').split('T')[0]}</Text></Right>
                </CardItem>
                <CardItem>
                  <Left><Text>Hora de inicio:</Text></Left>
                  <Right><Text>{this.state.element.start_of_manufacture.replace('Z','').split('T')[1]}</Text></Right>
                </CardItem>
                <CardItem>
                  <Left><Text>Hora de fim: </Text></Left>
                  <Right><Text>{this.state.element.end_of_manufacture.replace('Z','').split('T')[1]}</Text></Right>
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
                      source={{uri: "http://192.168.0.7:8000" + this.state.element.oil_image}}
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
                      <Text>{element.start_of_manufacture.replace('-','/').replace('-','/').split('T')[0]}</Text>
                    </Left>
                    <Right>
                      <Text>{element.start_of_manufacture.split('T')[1].replace('Z','')}</Text>
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
