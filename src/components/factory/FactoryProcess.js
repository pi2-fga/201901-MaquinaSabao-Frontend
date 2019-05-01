import React, {Component} from 'react';
import { Container, Spinner, Button, Text, Label, CardItem, Body, Card, Separator, View} from 'native-base';
import Stepper from 'react-native-js-stepper'
import { StyleSheet } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid';


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
      step: 0,
      machine_temp: 50,
    };
  }

  next_step = () => {
    this.setState({
      step: this.state.step + 1
    })
  }

  back_step = () => {
    this.setState({
      step: this.state.step - 1
    })
  }



  render() {

    let machine_temp

    if (this.state.machine_temp <= 40){
      machine_temp = <Text id='machine_temp' style={{color: 'green'}}>  {this.state.machine_temp}ºC</Text>
    }else{
      machine_temp = <Text id='machine_temp' style={{color: 'red'}}>  {this.state.machine_temp}ºC</Text>
    }


    return (
      <Container>
        <Grid>
            <Row style={{ height: '13%', marginBottom: '1%'}}>
                <Col style={{}}>
                  <Spinner color='blue' />
                </Col>
                <Col style={{justifyContent: 'center'}}>
                  <Label>Em andamento</Label>
                </Col>
            </Row>
          <Row style={{ height: '5%'}}>
            <Label style={{marginTop: '0%'}}>Temperatura da Máquina:</Label>
            {machine_temp}
          </Row>
          { this.state.step === 3 ? (<Row style={{ height: '3%'}}><Label>Temperatura da água: </Label><Text style={{color: 'red'}}>30ºC</Text></Row>) : (<View/>)}
          <Row style={{ height: '10%'}}>
            <Label style={{marginTop: '5%'}}>Etapas:</Label>
          </Row>
          <Row style={{ height: '37%'}}>
            <Stepper
              onPressNext={this.next_step}
              onPressBack={this.back_step}
              backButtonTitle="Anterior"
              nextButtonTitle="Próximo"
              validation={true}
              activeDotStyle={styles.activeDot}
              inactiveDotStyle={styles.inactiveDot}
              showTopStepper={true}
              showBottomStepper={true}
              steps={['->', '', '', '', '',]}
              activeStepStyle={styles.activeStep}
              inactiveStepStyle={styles.inactiveStep}
              activeStepTitleStyle={styles.activeStepTitle}
              inactiveStepTitleStyle={styles.inactiveStepTitle}
              activeStepNumberStyle={styles.activeStepNumber}
              inactiveStepNumberStyle={styles.inactiveStepNumber}
              initialPage={this.state.step}>

                 <Card>
                  <CardItem transparent={false} style={{backgroundColor: '#ADD8E6'}}>
                    <Body>
                      <Text>
                         {machine_steps[this.state.step]}
                      </Text>
                    </Body>
                  </CardItem>
                 </Card>

            </Stepper>
          </Row>
        </Grid>
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
