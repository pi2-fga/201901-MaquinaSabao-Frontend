
import React, { Component } from "react";
import MainScreenLayout from "./src/components/mainScreen/MainScreenLayout"
import Factory from "./src/components/factory/Factory"
import HomeScreen from "./src/components/HomeScreen"
import { Container } from 'native-base';
import Historic from "./src/components/historic/Historic"
import Bi from "./src/components/bi/Bi"
import Manual from "./src/components/manual/Manual"
import { BleManager } from 'react-native-ble-plx'
import { PermissionsAndroid } from 'react-native';
import { BluetoothStatus } from 'react-native-bluetooth-status';
import { NativeAppEventEmittem } from 'react-native'
import Manager from 'react-native-ble-manager';

const alcohol = {service: "1111", characteristic: "2222"}

const Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

export default class App extends Component {

  constructor(props){
    super(props)
    this.manager = new BleManager()
    this.state = {
      tab_number: 0,
      alcohol: '',
      oil: '',
      soda: '',
      feedback: '',
      essence: '',
      connect: true, // mudarrrrr
      device_id: '',
      response: 'receita2',
      temp: ''
    };
  }

  async componentDidMount(){
    // const ble = await Manager.enableBluetooth()

    const granted1 = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted1 === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
      this.componentDidMount()
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("permissão concedida");
      this.scanConnectReadDeviceService()
    } else {
      this.componentDidMount()
    }
  }

  async scanConnectReadDeviceService(){

    this.manager.startDeviceScan(
      null,
      null, (error, scannedDevice) => {
        if (error){
          alert(error)
        }else{
          console.log(scannedDevice.name);
          if(scannedDevice.name === 'Maquina de Sabao'){
            this.manager.stopDeviceScan()
            this.manager.connectToDevice(scannedDevice.id, null)
            .then((device) => {
              alert("Conectado!")
              this.setState({connect: true})
              return device.discoverAllServicesAndCharacteristics()
            })
            .then( async(device) => {
              // const services = await device.services()
              // const characteristics_alcohol = await services[2].characteristics()
              // const characteristics_oil = await services[3].characteristics()
              // const characteristics_essence = await services[4].characteristics()
              // const characteristics_temp = await services[5].characteristics()
              // const characteristics_soda = await services[6].characteristics()
              // const characteristics_feedback = await services[7].characteristics()
              //
              //
              // while(1){
              //   try {
              //
              //
              //     // Alcool
              //
              //     var characteristic = await device.readCharacteristicForService(
              //       services[2].uuid,
              //       characteristics_alcohol[0].uuid,
              //       null
              //     )
              //     await this.setState({alcohol: Base64.decode(characteristic.value)})
              //
              //     // Oleo
              //
              //     var characteristic2 = await device.readCharacteristicForService(
              //       services[3].uuid,
              //       characteristics_oil[0].uuid,
              //       null
              //     )
              //     await this.setState({oil: Base64.decode(characteristic2.value)})
              //
              //
              //     // Essencia
              //
              //     var characteristic3 = await device.readCharacteristicForService(
              //       services[4].uuid,
              //       characteristics_essence[0].uuid,
              //       null
              //     )
              //     await this.setState({essence1: Base64.decode(characteristic3.value)})
              //
              //     var characteristic4 = await device.readCharacteristicForService(
              //       services[4].uuid,
              //       characteristics_essence[1].uuid,
              //       null
              //     )
              //     await this.setState({essence2: Base64.decode(characteristic4.value)})
              //
              //     // Temperatura
              //
              //     //
              //     // var characteristic5 = await device.readCharacteristicForService(
              //     //   services[5].uuid,
              //     //   characteristics_temp[0].uuid,
              //     //   null
              //     // )
              //     // await this.setState({temp: Base64.decode(characteristic5.value)})
              //     //
              //
              //     // Soda
              //
              //     var characteristic7 = await device.readCharacteristicForService(
              //       services[6].uuid,
              //       characteristics_soda[0].uuid,
              //       null
              //     )
              //     await this.setState({soda: Base64.decode(characteristic7.value)})
              //
              //     // Feedback
              //
              //     var characteristic8 = await device.readCharacteristicForService(
              //       services[7].uuid,
              //       characteristics_feedback[0].uuid,
              //       null
              //     )
              //     await this.setState({feedback: Base64.decode(characteristic8.value)})
              //
              //     console.log(services[7].uuid);
              //     console.log(characteristics_feedback[0].uuid);
              //
              //     console.log(this.state.feedback);
              //     console.log("bbbbbbbbbbbbb");
              //
              //     if (this.state.feedback === 'pode comecar'){
              //       const feedback_write = await device.writeCharacteristicWithResponseForService(
              //         services[7].uuid,
              //         characteristics_feedback[1].uuid,
              //         Base64.encode(this.state.response),
              //       )
              //       console.log(feedback_write);
              //       console.log("aaaaaaaaaaa");
              //     }else if(this.state.feedback === 'FIM'){
              //       this.setState({response: '0'})
              //     }
              //
              //     // Feedback Escrita
              //
              //
              //   }catch(error){
              //     console.log(error);
              //     alert(error)
              //     device.cancelConnection()
              //     alert('Desconectado!')
              //     this.setState({connect: false})
              //     break
              //   }
              // }
              // this.scanConnectReadDeviceService()
            })
          }
        }
      }
    )
  }

  set_tab_number = (number) => {
    this.setState({tab_number: number})
  }

  render() {

    let tab;

    if (this.state.tab_number === 1 && this.state.connect === false){
      this.set_tab_number(0)
    }

    if(this.state.tab_number === 0){
      tab = <HomeScreen/>
    }
    else if (this.state.tab_number === 1){
      tab = <Factory alcohol={this.state.alcohol} oil={this.state.oil} soda={this.state.soda} essence1={this.state.essence1} essence2={this.state.essence2} temp={this.state.temp}/>
    }
    else if (this.state.tab_number === 2){
      tab = <Historic/>
    }
    else if (this.state.tab_number === 3){
      tab = <Bi/>
    }
    else if (this.state.tab_number === 4){
      tab = <Manual/>
    }

    return (
      <Container>
        <MainScreenLayout set_tab_number= {this.set_tab_number} connect= {this.state.connect}>
          {tab}
        </MainScreenLayout>
      </Container>
    );
  }
}
