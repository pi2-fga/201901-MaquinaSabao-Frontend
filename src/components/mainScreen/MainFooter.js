import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';


export default class MainFooter extends Component {

  constructor(props){
    super(props);
    this.state = {
      tab: [false, false, false, false]
    };
  }

  active_tab(number){

    if(number === '1'){
      this.setState({tab: [true, false, false, false]})
      this.props.set_tab_number(1)
    }
    else if (number === '2') {
      this.setState({tab: [false, true, false, false]})
      this.props.set_tab_number(2)
    }
    else if (number === '3') {
      this.setState({tab: [false, false, true, false]})
      this.props.set_tab_number(3)
    }
    else if (number === '4') {
      this.setState({tab: [false, false, false, true]})
      this.props.set_tab_number(4)
    }
  }

  render() {
    return (

        <Footer style={{height: '10%'}}>
          <FooterTab>
            <Button vertical active={this.state.tab[0]} onPress={() => this.active_tab('1')} style={{ height: '100%'}}>
              <Icon name='factory' type='MaterialCommunityIcons'/>
              <Text>Fabricar</Text>
            </Button>
            <Button vertical active={this.state.tab[1]} onPress={() => this.active_tab('2')} style={{ height: '100%'}}>
              <Icon name='history' type='MaterialIcons'/>
              <Text>Histórico</Text>
            </Button>
            <Button vertical active={this.state.tab[2]} onPress={() => this.active_tab('3')} style={{ height: '100%'}}>
              <Icon name='bar-graph' type='Entypo'/>
              <Text>BI</Text>
            </Button>
            <Button vertical active={this.state.tab[3]} onPress={() => this.active_tab('4')} style={{ height: '100%'}}>
              <Icon name='book-open' type='SimpleLineIcons'/>
              <Text>Manual</Text>
            </Button>
          </FooterTab>
        </Footer>

    );
  }
}
