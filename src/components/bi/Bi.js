import React, { Component } from "react";
import { Container, Text, View, Card, CardItem, Col, Row, Link, Title, Grid, Left, Spinner, Label, Right } from "native-base";
import { Image, Linking, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart   } from 'react-native-chart-kit'
import DeviceInfo from 'react-native-device-info';
import ProgressBar from 'react-native-progress/Bar'


export default class Bi extends Component {
  constructor(props){
    super(props)
    this.state = { list1: [], list2: [0.0], list3: [0.0], alcohol_link: '', soda_link: '', alcohol_img: '', soda_img: '', can_start1: false, can_start2: false, can_start3: false, no_chart: false, soda_name: '', alcohol_name: '', alcohol_price: '', soda_price: '', load: 0.0 }
  }
  componentDidMount(){
    fetch('http://18.231.192.68/index_manufacturing_month/?device_id=' + DeviceInfo.getUniqueID(), {
      method: 'get',
    }).then((response) => {
      console.log(response);
      return response.json();
    }).then((data) => {
      if(data.length === 0){
        this.setState({no_chart: true})
      }
      var list1_aux = [];
      var list2_aux = [];
      var list3_aux = [];
      for (var x in data){
        list1_aux.push(data[x].start_of_manufacture.split('T')[0])
        list2_aux.push(parseFloat(data[x].internet_soap_price))
        list3_aux.push(parseFloat(data[x].internet_soda_price)+ parseFloat( data[x].internet_alcohol_price))
      }
      this.setState({list1: list1_aux, list2: list2_aux, list3: list3_aux})
      this.setState({can_start1: true})
      this.setState({load: 0.3})
    })
    fetch('http://18.231.192.68/get_cheaper_alcohol_ml/', {
      method: 'get',
    }).then((response) => {
      return response.json();
    }).then((data) => {
      var alcohol_link_aux = data.item_link
      var alcohol_img_aux = data.item_img
      var alcohol_desc = data.item_description
      var alcohol_price = data.item_price
      this.setState({ alcohol_link: alcohol_link_aux, alcohol_img: alcohol_img_aux, alcohol_name: alcohol_desc, alcohol_price: alcohol_price })
      this.setState({can_start2: true})
      this.setState({load: 0.7})
    })
    fetch('http://18.231.192.68/get_cheaper_soda/', {
      method: 'get',
    }).then((response) => {
      return response.json();
    }).then((data) => {
      var soda_link_aux = data.item_link
      var soda_img_aux = data.item_img
      var soda_desc = data.item_description
      var soda_price = data.item_price
      this.setState({ soda_link: soda_link_aux, soda_img: soda_img_aux, soda_name: soda_desc, soda_price: soda_price })
      this.setState({can_start3: true})
      this.setState({load: 1})
    })
  }
  render() {
    if(this.state.can_start1 && this.state.can_start2 && this.state.can_start3){
      return (
        <Container>
          <Title style={{ color: 'white', backgroundColor: "#3f51b5" }}>ECONOMIA</Title>
          {
            this.state.no_chart? (
              <View/>
            ) : (
              <View style={{backgroundColor: '#3f51b5'}}>
              <Text style={{color: "#70ff69", marginLeft: '3%', marginTop: '3%'}}>* Valor gasto na produção</Text>
                  <Text style={{color: "red", marginLeft: '3%', marginBottom: '3%'}}>* Valor gasto na compra</Text>
                <LineChart
                  data={{
                    labels: this.state.list1,
                    datasets: [{
                      data: this.state.list2,
                      color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`
                    },
                    {
                      data: this.state.list3,
                      color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`
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
              </View>
            )
          }

          <Card>
          <Title style={{ color: 'black' }}>MATÉRIAS PRIMAS MAIS BARATAS</Title>
            <CardItem style={{ height: 150}}>
              <Col onPress={() => { Linking.openURL(this.state.alcohol_link) }}>
                  <Image
                    style={{  resizeMode: 'contain',height: 100, width: 100}}
                    source={{ uri: this.state.alcohol_img }}
                  />
              </Col>
              <Row>
                  <Text>{this.state.alcohol_name}</Text>
                </Row>
                <Row>
                  <Text style={{color: 'green'}}>R$ {this.state.alcohol_price.toString()}</Text>
                </Row>
            </CardItem>
            <CardItem style={{ height: 150}}>
              <Col onPress={() => { Linking.openURL(this.state.soda_link) }}>
                  <Image
                    style={{  resizeMode: 'contain',height: 100, width: 100}}
                    source={{ uri: this.state.soda_img }}
                  />
              </Col>
              <Row>
                  <Text>{this.state.soda_name}</Text>
                </Row>
                <Row>
                  <Text style={{color: 'green'}}>R$ {this.state.soda_price.toString()}</Text>
                </Row>
            </CardItem>
          </Card>
        </Container>
      );
    }else{
      return (
        <Container>
          <View style={{marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto',marginTop: '10%'}}>
            <Title style={{color: "black", marginBottom: '3%'}}>Carregando...</Title>
            <ProgressBar progress={this.state.load}/>
          </View>
        </Container>
      );
    }

  }
}
