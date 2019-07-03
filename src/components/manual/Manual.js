import React, { Component } from "react";
import { Container, Text, View, Title, Content, List, ListItem, Body } from "native-base";

export default class HomeScreen extends Component {
  render() {
    return (
      <View>
        <Title style={{color: 'black', marginTop: '5%'}}>
          Manual
        </Title>
          <List>
            <Body>
              <ListItem><Text>1 - Posicionar a máquina perto de uma fonte de água e de energia;</Text></ListItem>
              <ListItem><Text>2 - Escolher a quantidade de sabao e colocar a quantidade de ingredientes especificada no app, através das portilhas;</Text></ListItem>
              <ListItem><Text>3 - Usar o sistema de lavagem logo após a retirada do sabão e retirar e lavar manualmente o filtro do óleo;</Text></ListItem>
              <ListItem><Text>4 - Travar as rodinhas da máquina quando a mesma estiver parada e operando.</Text></ListItem>
            </Body>
          </List>
        </View>
    );
  }
}
