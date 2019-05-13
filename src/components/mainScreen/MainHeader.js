import React, { Component } from "react";
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text, Col, Grid, View } from "native-base";

export default class MainHeader extends Component {
  render() {
    return (
      <Container>
        <Header noLeft>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
            <View style={{alignItems: 'center', marginTop: '1%'}}>
              <Icon name="tint" type='FontAwesome' style={{color: 'white'}}/>
              <Title style={{fontSize: 13}}>FÁBRICA DE SABÃO</Title>
            </View>
        </Header>
        <Content>
            {this.props.children}
        </Content>
      </Container>
    );
  }
}
