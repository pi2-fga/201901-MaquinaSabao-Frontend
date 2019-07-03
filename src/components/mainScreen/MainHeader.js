import React, { Component } from "react";
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text, Col, Grid, View } from "native-base";

export default class MainHeader extends Component {
  render() {
    return (
      <Container>
        <Header>
          <View style={{alignItems: 'center', marginTop: '1%'}}>
            <Icon name="tint" type='FontAwesome' style={{color: 'white'}}  onPress={() => this.props.set_tab_number(0)}/>
            <Title style={{fontSize: 13}}  onPress={() => this.props.set_tab_number(0)}>FÁBRICA DE SABÃO</Title>
          </View>
          <Right>
            <Button style={{backgroundColor: this.props.connect ? 'green' : 'red'}}>
              <Icon name="bluetooth" />
            </Button>
          </Right>
        </Header>
        <Content>
            {this.props.children}
        </Content>
      </Container>
    );
  }
}
