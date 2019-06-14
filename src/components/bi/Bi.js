import React, { Component } from "react";
import { Container, Text, View, Card, CardItem, Col, Row, Link, Title, Grid, Left } from "native-base";
import { Image, Linking, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart   } from 'react-native-chart-kit'

export default class Bi extends Component {
  constructor(props){
    super(props)
    this.state = {list1:[], list2:[0.0], list3:[0.0]}
  }
  componentDidMount(){
    fetch('http://192.168.43.216:8000/index_manufacturing_month/', {
      method: 'get',
    }).then((response) => {
      console.log(response);
      return response.json();
    }).then((data) => {
      var list1_aux = [];
      var list2_aux = [];
      var list3_aux = [];
      for (var x in data){
        list1_aux.push(data[x].start_of_manufacture.split('T')[0])
        list2_aux.push(parseFloat(data[x].internet_soap_price))
        list3_aux.push(parseFloat(data[x].internet_soda_price)+ parseFloat( data[x].internet_alcohol_price))
      }
      this.setState({list1: list1_aux, list2: list2_aux, list3: list3_aux})
      console.log(this.state.list2)
      console.log(typeof this.state.list3)
    });
  }
  render() {
    return (
      <Container>
        <Title style={{ color: 'white', backgroundColor: "#3f51b5" }}>ECONOMIA</Title>
        <LineChart
          data={{
            labels: this.state.list1,
            datasets: [{
              data: this.state.list2
            },
            {
              data: this.state.list3
            }]
          }}
          width={Dimensions.get('window').width} // from react-native
          height={350}
          yAxisLabel={'R$'}
          chartConfig={{
            backgroundColor: '#3f51b5',
            backgroundGradientFrom: '#3f51b5',
            backgroundGradientTo: '#3f51b5',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
          }}
          bezier
        />
        <Card>
        <Title style={{ color: 'black' }}>MATÉRIAS PRIMAS MAIS BARATAS</Title>
          <CardItem style={{ height: 150}}>
            <Col onPress={() => { Linking.openURL('https://www.americanas.com.br/produto/26894060/soda-caustica-escamas-99-pote-1kg') }}>
                <Image
                  style={{  resizeMode: 'contain',height: undefined, width: undefined, flex: 1 }}
                  source={require('../../images/alcool.jpg')}
                />
            </Col>
            <Row>
                <Text>Alcool 92% Tupi 1 Litro</Text>
              </Row>
              <Row>
                <Text style={{color: 'green'}}>R$ 6,68</Text>
              </Row>
          </CardItem>
          <CardItem style={{ height: 150}}>
            <Col onPress={() => { Linking.openURL('https://www.americanas.com.br/produto/26894060/soda-caustica-escamas-99-pote-1kg') }}>
                <Image
                  style={{  resizeMode: 'contain',height: undefined, width: undefined, flex: 1 }}
                  source={require('../../images/soda.jpg')}
                />
            </Col>
            <Row>
                <Text>Soda Caustica Escamas 99% Pote 1kg</Text>
              </Row>
              <Row>
                <Text style={{color: 'green'}}>R$ 18,50</Text>
              </Row>
          </CardItem>
        </Card>
      </Container>
    );
  }
}
