import React, {Component} from 'react';
import { Container, Spinner } from 'native-base';


export default class FactoryProcess extends Component{
  render() {
    return (
      <Container>
        <Spinner color='blue'/>
      </Container>
    );
  }
}
