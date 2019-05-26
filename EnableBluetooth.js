import BleManager from 'react-native-ble-manager';


function start(){
  BleManager.enableBluetooth()
  .then(() => {
    // Success code
    console.log('The bluetooth is already enabled or the user confirm');
  })
  .catch((error) => {
    // Failure code
    alert('Você deve ativar o bluetooth para poder fabricar sabão!')
    this.scanConnectReadDeviceService()
    console.log('The user refuse to enable bluetooth');
  });
}

export default start;
