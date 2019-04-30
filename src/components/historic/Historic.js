import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Title, FlatList } from 'native-base';
import Show from './Show'

export default class Historic extends Component {
  render() {
    return (
      <Container>
      <Title style={{ color: 'black', marginTop: '5%', marginBottom: '10%' }}>HISTÓRICO DE FABRICAÇÕES</Title>
        <Content>
          <FlatList data={[{title: 'Item 1', key: 'item1'}, {title: 'Item 2', key: 'item2'} ]} renderItem={({item}) => <Show/>}/>
        </Content>
      </Container>
    );
  }
}
