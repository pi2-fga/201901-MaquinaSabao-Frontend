
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


const alcohol = {service: "1111", characteristic: "2222"}


export default class App extends Component {

  constructor(props){
    super(props)
    this.manager = new BleManager()
    this.state = {
      tab_number: 0,
      alcohol: '',
    };
    this.scanConnectReadDeviceService()
  }

  async componentDidMount(){
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("permissão concedida");
    } else {
      alert("Você precisa permitir para usar o aplicativo!")
      this.componentDidMount()
    }
  }

  scanConnectReadDeviceService(){
    this.manager.startDeviceScan(
      null,
      null, (error, scannedDevice) => {
        if (error){
          alert("error")
        }else{
          if(scannedDevice.name === 'Blank'){
            this.manager.stopDeviceScan()
            this.manager.connectToDevice(scannedDevice.id, null)
            .then((device) => {
              return device.discoverAllServicesAndCharacteristics()
            })
            .then(async (device) => {
              while(1){
                const characteristic = await device.readCharacteristicForService(
                  '1111',
                  '2222',
                  null
                )
                this.setState({alcohol: characteristic.value})
              }
              // device.cancelConnection()
              // this.scanConnectReadDeviceService()
              // characteristic.monitor((error, characteristic) => {
              //  if(error){
              //    alert(error)
              //  }else{
              //    this.setState({alcohol: characteristic})
              //  }
              // }, null)
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

    if(this.state.tab_number === 0){
      tab = <HomeScreen alcohol={this.state.alcohol}/>
    }
    else if (this.state.tab_number === 1){
      tab = <Factory/>
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
        <MainScreenLayout set_tab_number= {this.set_tab_number}>
          {tab}
        </MainScreenLayout>
      </Container>
    );
  }
}
