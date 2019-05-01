import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Picker, Body, Title, Text, Label, Button, Card, CardItem, Icon, Left, Right, View } from 'native-base';
import Modal from "react-native-modal";
import { TouchableOpacity, Image } from 'react-native'
import './global.js'

export default class FactoryForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quantity: 2,
      fragrance: 1,
      modal: false,
      oil: 250,
      alcohol: 125,
      soda: 150,
      wather: 1.4,
      essence: 20,
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

  open_modal = () => {
    this.setState({modal: true})
  }

  close_modal = () =>{
    this.setState({modal: false})
  }

  render() {
    let quantity_info

    var insumo_color = this.state.quantity === 2 ? 'green' : 'red'

    const fragrance_aux1 =  'e 20ml de essência'
    const fragrance_aux2 =  'e 40ml de essência'
    const fragrance_aux3 =  'e 60ml de essência'

    if (this.state.quantity === 2){
      quantity_info = <Text style={{marginTop: '2%'}}>250ml de óleo, 125ml de álcool, 150g de soda cáustica, 1.4L de água {this.state.fragrance ? fragrance_aux1 : ''}.</Text>
    }else if (this.state.quantity === 4) {
      quantity_info = <Text style={{marginTop: '2%'}}>500ml de óleo, 250ml de álcool, 200g de soda cáustica, 3.45L litros de água {this.state.fragrance ? fragrance_aux2 : ''}.</Text>
    }else if (this.state.quantity === 8) {
      quantity_info = <Text style={{marginTop: '2%'}}>1 litro de óleo, 500ml de álcool, 250g de soda cáustica, 6.5L de água {this.state.fragrance ? fragrance_aux3 : ''}.</Text>
    }



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
            <Picker.Item label="2 Litros" value={2} />
            <Picker.Item label="4 Litros" value={4} />
            <Picker.Item label="8 Litros" value={8} />
          </Picker>
        </Item>
        <Item picker>
          <Label>Fragrância:</Label>
          <Picker
            mode="dropdown"
            selectedValue={this.state.fragrance}
            onValueChange={this.set_fragrance.bind(this)}
          >
            <Picker.Item label="Sim" value={1} />
            <Picker.Item label="Não" value={0} />
          </Picker>
        </Item>
        <Container style={{ marginTop: '10%' }}>
          <Button block onPress={this.submit} disabled={this.state.quantity === 2 ? false : true} >
            <Text>Iniciar</Text>
          </Button>
          <Card style={{marginTop: '3%'}}>
            <CardItem transparent={false} style={{ backgroundColor: 'yellow'}}>
              <Body>
                <Title style={{color: 'black'}}>Quantidade necessaria de insumos:</Title>
                {quantity_info}
              </Body>
            </CardItem>
          </Card>
          <Card style={{marginTop: '3%'}}>
            <CardItem transparent={false} style={{}}>
              <Body>
                <Modal isVisible={this.state.modal}>
                  <View style={{ flex: 1 }}>
                      <Card>
                        <CardItem>
                          <Left>
                            <Icon name='paint-bucket' type='Foundation'/>
                            <Text style={{}}>óleo</Text>
                          </Left>
                          <Right>
                            <Text style={{color: insumo_color}}>{this.state.oil}ml</Text>
                          </Right>
                        </CardItem>
                        <CardItem>
                          <Left>
                            <Icon name='paint-bucket' type='Foundation'/>
                            <Text style={{}}>álcool</Text>
                          </Left>
                          <Right>
                            <Text style={{color: insumo_color}}>{this.state.alcohol}ml</Text>
                          </Right>
                        </CardItem>
                        <CardItem>
                          <Left>
                            <Icon name='paint-bucket' type='Foundation'/>
                            <Text style={{}}>soda cáustica</Text>
                          </Left>
                          <Right>
                            <Text style={{color: insumo_color}}>{this.state.soda}g</Text>
                          </Right>
                        </CardItem>
                        <CardItem>
                          <Left>
                            <Icon name='paint-bucket' type='Foundation'/>
                            <Text style={{}}>água</Text>
                          </Left>
                          <Right>
                            <Text style={{color: insumo_color}}>{this.state.wather}L</Text>
                          </Right>
                        </CardItem>
                        {
                          this.state.fragrance ?
                          (<CardItem>
                            <Left>
                              <Icon name='paint-bucket' type='Foundation'/>
                              <Text style={{}}>essência</Text>
                            </Left>
                            <Right>
                              <Text style={{color: insumo_color}}>{this.state.essence}ml</Text>
                            </Right>
                          </CardItem>) : (<View/>)
                        }
                        <CardItem>
                          <Title style={{color: 'black'}}>Qualidade do óleo:</Title>
                        </CardItem>
                        <CardItem>
                          <Image
                            style={{width: 100, height: 100}}
                            source={require('../../images/oleo.jpg')}
                          />
                          <Text style={{color: 'green', marginLeft: '5%'}}>Boa</Text>
                        </CardItem>
                        <Button block danger onPress={this.close_modal}>
                          <Icon name='md-close-circle-outline' style={{}}/>
                        </Button>
                      </Card>
                  </View>
                </Modal>
                <Button block success onPress={this.open_modal} danger={this.state.quantity === 2 ? false : true}>
                  <Icon name='format-color-fill' type='MaterialIcons'/>
                  <Text>Máquina</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        </Container>
      </Form>
    );
  }
}
