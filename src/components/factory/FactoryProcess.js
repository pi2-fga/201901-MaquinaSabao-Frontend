import React, {Component} from 'react';
import { Container, Spinner, Button, Text, Label, CardItem, Body, Card, Separator, View, Icon, Title} from 'native-base';
import StepIndicator from 'react-native-step-indicator';
import { StyleSheet } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid';
import './global.js'
import Modal from "react-native-modal";



const machine_steps = [
                       'Dissolvendo soda cáustica em água e dosando água em temperatura ambiente.\n(aproximadamente 7 minutos)',
                       'Acrescentando o óleo residual.\n(aproximadamente 5 minutos)',
                       'Acrescentando o álcool.\n(aproximadamente 5 minutos)',
                       'Acrescentando o água fervente.\n(aproximadamente 5 minutos)',
                       'Acrescentando essência, e misturando.\n(aproximadamente 15 minutos)',
                      ]

export default class FactoryProcess extends Component{

  constructor(props) {
    super(props);
    this.close_modal = this.close_modal.bind(this)
  }

  close_modal(){
    this.props.set_screen('main')
    global.factory_screen = 'main'
    this.props.close_conclusion_modal
  }

  render() {

    let machine_temp

    let conclusion_modal

    if (parseFloat(this.props.temp) <= 40){
      machine_temp = <Text id='machine_temp' style={{color: 'green'}}>  {this.props.temp}ºC</Text>
    }else{
      machine_temp = <Text id='machine_temp' style={{color: 'red'}}>  {this.props.temp}ºC</Text>
    }

    if( this.props.conclusion_modal ){
      conclusion_modal = (<Modal isVisible={this.props.conclusion_modal}><Card><CardItem><Text style={{color: 'green'}}>Processo de fabricação finalizado!</Text></CardItem><Button block success onPress={this.close_modal}><Text>Voltar</Text></Button></Card></Modal>)
    }else{
      conclusion_modal = (<View></View>)
    }

    const color_dict = {'2': 150, '4': 200, '8': 250}

    var color_soda

    if(color_dict[this.props.amount_of_soap_request] <= parseFloat(this.props.soda)){
      color_soda = 'green'
    }else{
      color_soda = 'red'
    }

    if(isNaN(this.props.feedback)){
      return (
        <Container>
          <Title style={{color: "black"}}>Aguarde...</Title>
          <Spinner color='blue' />
        </Container>
      )
    }else{
      return (
        <Container>
        <StepIndicator currentPosition={parseInt(this.props.feedback, 10) - 1}/>
          <Grid>
              <Row style={{ height: '13%', marginBottom: '1%'}}>
                  <Col style={{}}>
                    <Spinner color='blue' />
                  </Col>
                  <Col style={{justifyContent: 'center'}}>
                    <Label>Em andamento</Label>
                  </Col>
              </Row>

              <Card>
               <CardItem transparent={false} style={{backgroundColor: '#ADD8E6'}}>
                 <Body>
                   <Text>
                      {machine_steps[parseInt(this.props.feedback, 10) - 1]}
                   </Text>
                 </Body>
               </CardItem>
                { parseInt(this.props.feedback, 10) - 1 === 0 ? (<CardItem style={{backgroundColor: '#fffd94'}}><Grid><Icon name='alert-triangle' type='Feather'/><Label style={{color: 'black'}}>É necessário colocar {color_dict[this.props.amount_of_soap_request]} g de soda cáustica!</Label></Grid></CardItem>) : (<View/>)}

                { parseInt(this.props.feedback, 10) - 1 === 0 ? (<CardItem transparent={false} style={{backgroundColor: '#fffd94'}}><Grid><Icon name='paint-bucket' type='Foundation'/><Label style={{color: 'black'}}>Soda Cáustica: </Label><Text style={{color: color_soda}}> {this.props.soda} g</Text></Grid></CardItem>) : (<View/>)}

              </Card>
              <Row style={{ height: '5%', marginTop: '2%', marginLeft: '1%'}}>
                <Label style={{marginTop: '0%'}}>Temperatura da Máquina:</Label>
                {machine_temp}
              </Row>
          </Grid>
          {
            conclusion_modal
          }
        </Container>
      );
    }


  }
}

const styles = StyleSheet.create({
  activeDot: {
    backgroundColor: 'grey'
  },
  inactiveDot: {
    backgroundColor: '#ededed'
  },
  activeStep: {
    backgroundColor: 'grey'
  },
  inactiveStep: {
    backgroundColor: '#ededed'
  },
  activeStepTitle: {
    fontWeight: 'normal'
  },
  inactiveStepTitle: {
    fontWeight: 'normal'
  },
  activeStepNumber: {
    color: 'white'
  },
  inactiveStepNumber: {
    color: 'black'
  }
})
