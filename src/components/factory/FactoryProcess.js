import React, {Component} from 'react';
import { Container, Spinner, Button, Text, Label, CardItem, Body, Card, Separator, View, Icon, Title} from 'native-base';
import StepIndicator from 'react-native-step-indicator';
import { StyleSheet } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid';
import './global.js'


const machine_steps = [
                       'Dissolvendo soda cáustica em água e dosando água em temperatura ambiente.\n(aproximadamente 7 minutos)',
                       'Acrescentando o óleo residual.\n(aproximadamente 50 segundos)',
                       'Acrescentando o álcool.\n(aproximadamente 20 segundos)',
                       'Acrescentando o água fervente.\n(aproximadamente 5 minutos)',
                       'Acrescentando essência, e misturando.\n(aproximadamente 20 minutos)',
                       'Para concluir a fabricação, abra a torneira para retirar o sabão.',
                      ]

export default class FactoryProcess extends Component{

  constructor(props) {
    super(props);
  }

  render() {

    let machine_temp

    if(global.factory_screen === 'main'){
      this.props.set_screen('main')
    }

    if (parseFloat(this.props.temp) <= 40){
      machine_temp = <Text id='machine_temp' style={{color: 'green'}}>  {this.props.temp}ºC</Text>
    }else{
      machine_temp = <Text id='machine_temp' style={{color: 'red'}}>  {this.props.temp}ºC</Text>
    }

    const color_dict = {'2': 150, '4': 150, '8': 250}

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
        <StepIndicator stepCount={6} currentPosition={parseInt(this.props.feedback, 10) - 1}/>
          <Grid>
              <Row style={{ height: '13%', marginBottom: '1%'}}>
                  <Col style={{}}>
                    {
                      parseInt(this.props.feedback, 10) - 1 === 5 ? (<Icon style={{marginLeft: "auto", marginRight: "auto", marginTop: "auto", marginBottom: "auto", color: "green"}} name='alert-triangle' type='Feather'/>) : (<Spinner color='blue' />)
                    }
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
              {
                parseInt(this.props.feedback, 10) - 1 === 3 ? (<Row style={{ height: '5%', marginTop: '2%', marginLeft: '1%'}}><Label style={{marginTop: '0%'}}>Temperatura da Água:</Label>{machine_temp}</Row>) : (<View/>)
              }
          </Grid>
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
