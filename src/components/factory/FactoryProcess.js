import React, {Component} from 'react';
import { Container, Spinner, Button, Text, Label, CardItem, Body, Card, Separator, View} from 'native-base';
import StepIndicator from 'react-native-step-indicator';
import { StyleSheet } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid';
import TimerMixin from 'react-timer-mixin';
import './global.js'
import Modal from "react-native-modal";



const machine_steps = [
                       'Dissolvendo soda cáustica em água.\n(aproximadamente 7 minutos)',
                       'Acrescentando o óleo residual, e misturando.\n(aproximadamente 5 minutos)',
                       'Acrescentando o álcool, e misturando.\n(aproximadamente 5 minutos)',
                       'Acrescentando o água fervente, e misturando.\n(aproximadamente 5 minutos)',
                       'Acrescentando o água a temperatura ambiente e essência, e misturando.\n(aproximadamente 15 minutos)',
                      ]

export default class FactoryProcess extends Component{

  constructor(props) {
    super(props);
    this.state = {
      step: global.step_process,
      machine_temp: 50,
      conclusion_modal: false,
    };
    this.close_modal = this.close_modal.bind(this)
  }

  mixins: [TimerMixin]
  componentDidMount() {
    if (global.step_process !== 4){
      setTimeout(() => {
        this.setState({
          step: 1
        })
        global.step_process = 1
        setTimeout(() => {
          this.setState({
            step: 2
          })
          global.step_process = 2
          setTimeout(() => {
            this.setState({
              step: 3
            })
            global.step_process = 3
            setTimeout(() => {
              this.setState({
                step: 4
              })
              global.step_process = 4
              setTimeout(() => {
                this.setState({
                  conclusion_modal: true
                })
              }, 3000);
            }, 3000);
          }, 3000);
        }, 3000);
      }, 3000);
    }
  }

  close_modal(){
    this.props.set_screen('main')
    global.factory_screen = 'main'
    this.setState({
      conclusion_modal: false
    })
  }

  render() {

    let machine_temp

    let conclusion_modal

    if (this.state.machine_temp <= 40){
      machine_temp = <Text id='machine_temp' style={{color: 'green'}}>  {this.state.machine_temp}ºC</Text>
    }else{
      machine_temp = <Text id='machine_temp' style={{color: 'red'}}>  {this.state.machine_temp}ºC</Text>
    }

    if( this.state.conclusion_modal ){
        global.step_process = 0
      conclusion_modal = (<Modal isVisible={this.state.conclusion_modal}><Card><CardItem><Text style={{color: 'green'}}>Processo de fabricação finalizado!</Text></CardItem><Button block success onPress={this.close_modal}><Text>Voltar</Text></Button></Card></Modal>)
    }else{
      conclusion_modal = (<View></View>)
    }

    return (
      <Container>
      <StepIndicator currentPosition={this.state.step}/>
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
                    {machine_steps[this.state.step]}
                 </Text>
               </Body>
             </CardItem>
             <CardItem transparent={false} style={{backgroundColor: '#ADD8E6'}}>
               { this.state.step === 3 ? (<Grid><Label>Temperatura da água: </Label><Text style={{color: 'red'}}>30ºC</Text></Grid>) : (<View/>)}
             </CardItem>
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
