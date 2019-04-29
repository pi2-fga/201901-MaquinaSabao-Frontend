import React, {Component} from 'react';
import { Container, Spinner, Button, Text, Label} from 'native-base';
import Stepper from 'react-native-js-stepper'
import { StyleSheet } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid';


export default class FactoryProcess extends Component{

  constructor(props) {
    super(props);
    this.state = {
      step: 0,
    };
  }

  next_step = (event) => {

  }

  render() {
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
            <Label style={{marginTop: '5%'}}>Passos:</Label>
          </Row>
          <Row>
            <Stepper
              validation={false}
              activeDotStyle={styles.activeDot}
              inactiveDotStyle={styles.inactiveDot}
              showTopStepper={true}
              showBottomStepper={false}
              steps={['Diluir soda cáustica em água', 'Acrescentar óleo residual', 'Misturar']}
              activeStepStyle={styles.activeStep}
              inactiveStepStyle={styles.inactiveStep}
              activeStepTitleStyle={styles.activeStepTitle}
              inactiveStepTitleStyle={styles.inactiveStepTitle}
              activeStepNumberStyle={styles.activeStepNumber}
              inactiveStepNumberStyle={styles.inactiveStepNumber}
              initialPage={this.state.step}>
              <Container>
              </Container>
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
