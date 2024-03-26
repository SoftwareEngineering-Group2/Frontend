import { updateDeviceState } from '../../api/deviceService';

export default async function handleSpeech(text: string, setSpokenText: Function){
  console.log("Spoken Text:", text);
  var words = text.toLowerCase();
  
  if (words === "turn on white led") { 
    console.log("white led on")
    const newState = { state: true};
    // Update the device state in the backend
    await updateDeviceState("whiteLed", newState);
    setSpokenText(text);
  }else if (words === "turn off white led"){
    console.log("white led off")
    const newState = { state: false};
    // Update the device state in the backend
    await updateDeviceState("whiteLed", newState);
    setSpokenText(text);
  }

}