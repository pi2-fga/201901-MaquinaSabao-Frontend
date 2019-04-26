import React, {Component} from 'react';
import MainHeader from './MainHeader'
import MainFooter from './MainFooter'
import { Container } from 'native-base';


export default class MainScreenLayout extends Component{
  render() {
    return (
      <Container >
        <MainHeader>
          {this.props.children}
        </MainHeader>
        <MainFooter set_tab_number= {this.props.set_tab_number}/>
      </Container>
    );
  }
}
