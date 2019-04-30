
import React, { Component } from "react";
import MainScreenLayout from "./src/components/mainScreen/MainScreenLayout"
import Factory from "./src/components/factory/Factory"
import HomeScreen from "./src/components/HomeScreen"
import { Container } from 'native-base';
import Historic from "./src/components/historic/Historic"

export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      tab_number: 0,
    };
  }

  set_tab_number = (number) => {
    this.setState({tab_number: number})
  }

  render() {

    let tab;

    if(this.state.tab_number === 0){
      tab = <HomeScreen/>
    }
    else if (this.state.tab_number === 1){
      tab = <Factory/>
    }
    else if (this.state.tab_number === 2){
      tab = <Historic/>
    }

    return (
      <Container  styles={{}}>
        <MainScreenLayout set_tab_number= {this.set_tab_number}>
          {tab}
        </MainScreenLayout>
      </Container>
    );
  }
}
