import React, { Component } from 'react';
import { Container, Header, Content, Text, Title, List, FlatList, ListItem, Right, Left, Button, View, Icon, Card, CardItem, DatePicker } from 'native-base';
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
          actual_ph: '',
          oil_quality: '',
          have_fragrance: true,
          oil_image: '',
        },
      list: [], // {id: 1, start_of_manufacture: '2019-06-04TAAA'}
      chosenDate: new Date(),
      static_list: [] // {id: 1, start_of_manufacture: '2019-06-04TAAA'}
    }
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.filter_historic_list_date(newDate.toJSON());
    this.setState({ chosenDate: newDate });
  }

  filter_historic_list_date(date){
    new_list = []
    for(var x in this.state.static_list){
      if (this.state.static_list[x].start_of_manufacture.split('T')[0] === date.split('T')[0]){
        new_list.push(this.state.static_list[x])
      }
    }
    this.setState({list: new_list})
  }

  componentDidMount(){
    fetch('http://52.67.39.4/index_manufacturing_month/', {
      method: 'get',
    }).then((response) => {
      console.log(response);
      return response.json();
    }).then((data) => {
      this.setState({list: data})
      this.setState({static_list: data})
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
              <Button block success>
              <DatePicker
                  defaultDate={new Date()}
                  locale={"pt-br"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="[Calendário]"
                  textStyle={{ color: "white" }}
                  placeHolderTextStyle={{ color: "white" }}
                  onDateChange={this.setDate}
                  disabled={false}
                  />
              </Button>
              </Right>
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
                      source={{uri: "http://52.67.39.4" + this.state.element.oil_image}}
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
