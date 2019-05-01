import React, {Component} from 'react';
import { Container, Spinner, Button, Text, Label, CardItem, Body, Card} from 'native-base';
import Stepper from 'react-native-js-stepper'
import { StyleSheet } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid';


const machine_steps = [
                       'Dissolvendo soda cáustica em água.\n(Isso pode demorar aproximadamente 7 minutos)',
                       'Acrescentando o óleo residual, e misturando.\n(Isso pode demorar aproximadamente 5 minutos)',
                       'Acrescentando o álcool, e misturando.\n(Isso pode demorar aproximadamente 5 minutos)',
                       'Acrescentando o água fervente, e misturando.\n(Isso pode demorar aproximadamente 5 minutos)',
                       'Acrescentando o água a temperatura ambiente e essência, e misturando.\n(Isso pode demorar aproximadamente 15 minutos)',
                      ]

export default class FactoryProcess extends Component{

  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      machine_temp: 50,
    };
  }

  next_step = (event) => {

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
          <Row style={{ height: 90}}>
            <Col style={{}}>
              <Spinner color='blue' />
            </Col>
            <Col style={{justifyContent: 'center'}}>
              <Label>Em andamento</Label>
            </Col>
          </Row>
          <Row style={{ height: 60}}>
            <Label style={{marginTop: '5%'}}>Etapas:</Label>
          </Row>
          <Row>
            <Stepper
              validation={false}
              activeDotStyle={styles.activeDot}
              inactiveDotStyle={styles.inactiveDot}
              showTopStepper={true}
              showBottomStepper={false}
              steps={['', '', '', '', '']}
              activeStepStyle={styles.activeStep}
              inactiveStepStyle={styles.inactiveStep}
              activeStepTitleStyle={styles.activeStepTitle}
              inactiveStepTitleStyle={styles.inactiveStepTitle}
              activeStepNumberStyle={styles.activeStepNumber}
              inactiveStepNumberStyle={styles.inactiveStepNumber}
              initialPage={this.state.step}>
              <Container>
                 <Card>
                  <CardItem transparent={false}>
                    <Body>
                      <Text>
                         {machine_steps[this.state.step]}
                      </Text>
                    </Body>
                  </CardItem>
                 </Card>
              </Container>
            </Stepper>
          </Row>
          <Row style={{ height: 320}}>
            <Label style={{marginTop: '0%'}}>Temperatura da Máquina:</Label>
            {machine_temp}
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
