import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Picker, Body, Title, Text, Label, Button, Card, CardItem, Icon, Left, Right, View, Spinner } from 'native-base';
import Modal from "react-native-modal";
import { TouchableOpacity, Image } from 'react-native'
import './global.js'
import ImagePicker from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';


export default class FactoryForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quantity: 2,
      fragrance: 1,
      modal: false,
      essence_choice: 1,
      picture: undefined,
      oil_quality: '',
      spinner: false
    };
    this.submit = this.submit.bind(this)
    this.take_picture = this.take_picture.bind(this)
    this.props.set_request({amount_of_soap_request: this.state.quantity.toString()})
    this.props.set_request({have_fragrance_request: this.state.fragrance === 1? 'True' : 'False'})
  }

  can_start(){
    var alcohol = parseFloat(this.props.alcohol)
    var oil = parseFloat(this.props.oil)
    var soda = parseFloat(this.props.soda)
    var essence1 = parseFloat(this.props.essence1)
    var essence2 = parseFloat(this.props.essence2)

    return true // aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa <<< mudar

    if (this.state.quantity === 2){
      if(alcohol < 125){
        return false
      }
      if(oil < 250){
        return false
      }
      if(this.state.fragrance === 1 && this.state.essence_choice === 1 && this.state.essence1 < 20){
        return false
      }
      if(this.state.fragrance === 1 && this.state.essence_choice === 2 && this.state.essence2 < 20){
        return false
      }
    }else if(this.state.quantity === 4){
      if(alcohol < 250){
        return false
      }
      if(oil < 500){
        return false
      }
      if(this.state.fragrance === 1 && this.state.essence_choice === 1 && this.state.essence1 < 40){
        return false
      }
      if(this.state.fragrance === 1 && this.state.essence_choice === 2 && this.state.essence2 < 40){
        return false
      }
    }else if(this.state.quantity === 8){
      if(alcohol < 500){
        return false
      }
      if(oil < 1000){
        return false
      }
      if(this.state.fragrance === 1 && this.state.essence_choice === 1 && this.state.essence1 < 60){
        return false
      }
      if(this.state.fragrance === 1 && this.state.essence_choice === 2 && this.state.essence2 < 60){
        return false
      }
    }
    if( this.state.picture === undefined || this.state.oil_quality === '' ){
      return false
    }
    return true
  }

  set_quantity(value) {
    this.props.set_request({amount_of_soap_request: value.toString()})
    this.setState({
      quantity: value
    });
  }

  set_fragrance(value) {
    this.props.set_request({have_fragrance_request: value === '1'? 'True' : 'False'})
    this.setState({
      fragrance: value
    });
  }

  set_essence_choice(value: string) {
    this.setState({
      essence_choice: value
    });
  }

  submit(){
    this.props.set_request({start_of_manufacture_request: new Date().toJSON().replace('T', ' ').substr(0,19)})
    this.props.set_screen('process')
    var response = '0'
    var quantity_aux = ''
    if (this.state.quantity === 2) {
      quantity_aux = '1'
    }
    else if (this.state.quantity === 4){
      quantity_aux = '2'
    }else{
      quantity_aux = '3'
    }
    if (this.state.fragrance) {
      response = "receita" + quantity_aux + this.state.essence_choice
    }else{
      reponse = "receita" + this.state.quantity + '0'
    }
    this.props.set_response(response)
    global.factory_screen = 'process'
  }

  open_modal = () => {
    this.setState({modal: true})
  }

  close_modal = () =>{
    this.setState({modal: false})
  }

  async take_picture(){

    options = {
      title: null,
      takePhotoButtonTitle: 'Tirar Foto...',
      chooseFromLibraryButtonTitle: null,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };

        this.setState({spinner: true})

        this.setState({oil_quality: ''})
        this.props.set_request({oil_quality_request: ''})

        const data = new FormData();
        data.append('photo', {
          uri: response.uri,
          type: 'image/jpeg', // or photo.type
          name: 'foto'
        });

        fetch('http://192.168.0.194:8000/predict_oil_quality/', {
          method: 'post',
          body: data
        })
        .then((response) => {
          this.setState({spinner: false})
          if(response.ok){
            return response.json()
          }
        })
        .then((data) => {
          if(data){
            if(data === 'NO OIL'){
              alert("Tire outra foto, isso não é um óleo!")
              this.props.set_request({oil_image_request: ''})
              this.setState({picture: undefined})
            }else{
              this.setState({
                oil_quality: data,
              })
              this.props.set_request({oil_quality_request: data})
            }
          }
        })

        this.props.set_request({oil_image_request: source})
        this.setState({
          picture: source,
        });
      }
    });
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
        {
          this.state.fragrance ? (
            <Item picker>
              <Label>Compartimento:</Label>
              <Picker
                mode="dropdown"
                selectedValue={this.state.essence_choice}
                onValueChange={this.set_essence_choice.bind(this)}
              >
                <Picker.Item label="1" value={1} />
                <Picker.Item label="2" value={2} />
              </Picker>
            </Item>
          ) : (<View/>)
        }
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
                            <Text style={{}}>Óleo</Text>
                          </Left>
                          <Right>
                            <Text style={{color: insumo_color}}>{this.props.oil} ml</Text>
                          </Right>
                        </CardItem>
                        <CardItem>
                          <Left>
                            <Icon name='paint-bucket' type='Foundation'/>
                            <Text style={{}}>Álcool</Text>
                          </Left>
                          <Right>
                            <Text style={{color: insumo_color}}>{this.props.alcohol} ml</Text>
                          </Right>
                        </CardItem>
                        {
                          this.state.fragrance && this.state.essence_choice === 1 ?
                          (<CardItem>
                            <Left>
                              <Icon name='paint-bucket' type='Foundation'/>
                              <Text style={{}}>Essência (Compartimento 1)</Text>
                            </Left>
                            <Right>
                              <Text style={{color: insumo_color}}>{this.props.essence1} ml</Text>
                            </Right>
                          </CardItem>) : (<View/>)
                        }
                        {
                          this.state.fragrance && this.state.essence_choice === 2 ?
                          (<CardItem>
                            <Left>
                              <Icon name='paint-bucket' type='Foundation'/>
                              <Text style={{}}>Essência (Compartimento 2)</Text>
                            </Left>
                            <Right>
                              <Text style={{color: insumo_color}}>{this.props.essence2} ml</Text>
                            </Right>
                          </CardItem>) : (<View/>)
                        }
                        <CardItem>
                          <Title style={{color: 'black'}}>Qualidade do óleo:</Title>
                        </CardItem>
                          <View style={{marginTop: '5%'}}>
                            <Button block dark onPress={this.take_picture}>
                              <Text>Tirar foto do óleo</Text>
                              <Icon name='camera' type='AntDesign'/>
                            </Button>
                          </View>
                        <CardItem>
                          {
                            this.state.picture ?
                            (
                              <View>
                                <Image
                                  style={{width: 100, height: 100}}
                                  source={this.state.picture}
                                />
                              </View>
                            ) : (
                              <View>
                                <Icon name='alert-triangle' type='Feather' style={{marginLeft: "auto", marginRight: "auto", marginBottom: '3%'}}/>
                                <Text style={{ marginLeft: '5%'}}>Você precisa tirar uma foto do óleo para fabricar!</Text>
                              </View>
                            )

                          }
                          {
                            this.state.spinner ? (<Spinner color='blue' style={{marginLeft: "auto", marginRight: "auto"}} />) : (<Text style={{color: this.state.oil_quality === 'GOOD' ? 'green' : 'red', marginLeft: '5%'}}>{this.state.oil_quality}</Text>)
                          }


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
