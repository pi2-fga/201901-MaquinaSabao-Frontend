import React, { Component } from "react";
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text } from "native-base";

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
          <Body>
            <Title>Grifinóleo</Title>
          </Body>
          <Right>
            <Button iconLeft light>
              <Icon name='format-color-fill' type='MaterialIcons' />
              <Text>Máquina</Text>
            </Button>
          </Right>
        </Header>
        <Content padder>
            {this.props.children}
        </Content>
      </Container>
    );
  }
}
