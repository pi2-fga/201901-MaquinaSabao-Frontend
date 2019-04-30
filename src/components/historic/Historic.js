import React, { Component } from 'react';
import { Container, Header, Content, Text, Title, List, FlatList, ListItem } from 'native-base';
import Show from './Show'


const list = [{id: 1, data: '12/01/2019'}, {id: 2, data: '12/01/2019'}]

export default class Historic extends Component {
  render() {
    return (
      <Container>
      <Title style={{ color: 'black', marginTop: '5%', marginBottom: '10%' }}>HISTÓRICO DE FABRICAÇÕES</Title>
        <Content>
          <List>
            {
              list.map( (element) => (
                <ListItem key={element.id}>
                  <Text>{element.id}</Text>
                  <Text>{element.data}</Text>
                </ListItem>
              ))
            }
          </List>
        </Content>
      </Container>
    );
  }
}
