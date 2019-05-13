import React, { Component } from "react";
import { Container, Text, View, Card, CardItem, Col, Row, Link, Title, Grid } from "native-base";
import { Image, Linking } from 'react-native'

export default class Bi extends Component {
  render() {
    return (
      <View>
      <Title style={{color: 'black', marginBottom: '2%', marginTop: '2%'}}>Preços mais acessíveis:</Title>
      <Card>
        <CardItem>
            <Col onPress={() => { Linking.openURL('https://www.americanas.com.br/produto/26894060/soda-caustica-escamas-99-pote-1kg') }}>
              <Image
                style={{width: 100, height: 100}}
                source={require('../../images/soda.jpg')}
              />
            </Col>
            <Col onPress={() => { Linking.openURL('https://www.americanas.com.br/produto/26894060/soda-caustica-escamas-99-pote-1kg') }}>
              <Row>
                <Text>Soda Caustica Escamas 99 Pote 1kg</Text>
              </Row>
              <Row>
                <Text style={{color: 'green'}}>R$ 18,50</Text>
              </Row>
              <Row>
                <Text>Lojas Americanas</Text>
              </Row>
            </Col>
        </CardItem>
        <CardItem>
            <Col onPress={() => { Linking.openURL('https://www.americanas.com.br/produto/26894060/soda-caustica-escamas-99-pote-1kg') }}>
              <Image
                style={{width: 100, height: 100}}
                source={require('../../images/alcool.jpg')}
              />
            </Col>
            <Col onPress={() => { Linking.openURL('https://www.americanas.com.br/produto/26894060/soda-caustica-escamas-99-pote-1kg') }}>
              <Row>
                <Text>Alcool 92% Tupi 1 Litro</Text>
              </Row>
              <Row>
                <Text style={{color: 'green'}}>R$ 6,68</Text>
              </Row>
              <Row>
                <Text>Lojas Americanas</Text>
              </Row>
            </Col>
        </CardItem>
      </Card>
      <Title style={{color: 'black', marginBottom: '2%', marginTop: '2%'}}>Você Economizou:</Title>
      <Card>
        <Grid>
          <Text style={{marginLeft: 'auto', marginRight: 'auto', fontSize: 70, color: 'green'}}>R$ 130,00</Text>
        </Grid>
      </Card>
      </View>
    );
  }
}
