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
      oil: this.props.oil,
      alcohol: this.props.alcohol,
      soda: this.props.soda,
      wather: this.props.wather,
      essence: this.props.essence,
    };
    this.submit = this.submit.bind(this)
  }

  can_start(){
    var alcohol = parseFloat(this.props.alcohol)
    var oil = parseFloat(this.props.oil)
    var soda = parseFloat(this.props.soda)
    var wather = parseFloat(this.props.wather)
    var essence = parseFloat(this.props.essence)

    if (this.state.quantity === 2){
      if(alcohol < 125){
        return false
      }
      if(oil < 250){
        return false
      }
      if(soda < 150){
        return false
      }
      if(wather < 1400){
        return false
      }
      if(this.state.fragrance === 1 && essence < 20){
        return false
      }
    }else if(this.state.quantity === 4){
      if(alcohol < 250){
        return false
      }
      if(oil < 500){
        return false
      }
      if(soda < 200){
        return false
      }
      if(wather < 3450){
        return false
      }
      if(this.state.fragrance === 1 && essence < 40){
        return false
      }
    }else if(this.state.quantity === 8){
      if(alcohol < 500){
        return false
      }
      if(oil < 1000){
        return false
      }
      if(soda < 250){
        return false
      }
      if(wather < 6500){
        return false
      }
      if(this.state.fragrance === 1 && essence < 60){
        return false
      }
    }
    return true
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

    var insumo_color = this.can_start() ? 'green' : '#efdd3b'

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

        <Container style={{}}>
          <Card style={{marginTop: '5%', marginBottom: '5%'}}>
            <CardItem transparent={false} style={{ backgroundColor: 'yellow'}}>
              <Body >
                <Icon name='alert-triangle' type='Feather' style={{marginLeft: "auto", marginRight: "auto", marginBottom: '3%'}}/>
                <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>Quantidade necessária de insumos:</Text>
                {quantity_info}
                <Button block success onPress={this.open_modal} danger={!this.can_start()} style={{marginTop: '3%'}}>
                  <Icon name='format-color-fill' type='MaterialIcons'/>
                  <Text>Máquina</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
                <Modal isVisible={this.state.modal}>
                  <View style={{ flex: 1 }}>
                      <Card>
                        <CardItem>
                          <Left>
                            <Icon name='paint-bucket' type='Foundation'/>
                            <Text style={{}}>óleo</Text>
                          </Left>
                          <Right>
                            <Text style={{color: insumo_color}}>{this.props.oil} ml</Text>
                          </Right>
                        </CardItem>
                        <CardItem>
                          <Left>
                            <Icon name='paint-bucket' type='Foundation'/>
                            <Text style={{}}>álcool</Text>
                          </Left>
                          <Right>
                            <Text style={{color: insumo_color}}>{this.props.alcohol} ml</Text>
                          </Right>
                        </CardItem>
                        <CardItem>
                          <Left>
                            <Icon name='paint-bucket' type='Foundation'/>
                            <Text style={{}}>soda cáustica</Text>
                          </Left>
                          <Right>
                            <Text style={{color: insumo_color}}>{this.props.soda} g</Text>
                          </Right>
                        </CardItem>
                        <CardItem>
                          <Left>
                            <Icon name='paint-bucket' type='Foundation'/>
                            <Text style={{}}>água</Text>
                          </Left>
                          <Right>
                            <Text style={{color: insumo_color}}>{this.props.wather} ml</Text>
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
                              <Text style={{color: insumo_color}}>{this.props.essence} ml</Text>
                            </Right>
                          </CardItem>) : (<View/>)
                        }
                        <CardItem>
                          <Title style={{color: 'black'}}>Qualidade do óleo:</Title>
                        </CardItem>
                          <View style={{marginTop: '5%'}}>
                            <Button block dark>
                              <Text>Tirar foto do óleo</Text>
                              <Icon name='camera' type='AntDesign'/>
                            </Button>
                          </View>
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
                <Button id="start-button" block onPress={this.submit} disabled={!this.can_start()} >
                  <Text>Iniciar</Text>
                </Button>
        </Container>
      </Form>
    );
  }
}
