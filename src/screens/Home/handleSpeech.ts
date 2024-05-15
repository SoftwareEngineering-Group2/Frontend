import { updateDeviceState } from '../../api/deviceService';

export default async function handleSpeech(text: string, setSpokenText: Function){
  console.log("Spoken Text:", text);
  var words = text.toLowerCase();
  //white LED
  if (words === "turn on white lamp") { 
    const newState = { state: true};
    // Update the device state in the backend
    await updateDeviceState("whiteLed", newState);
    setSpokenText(text);
  }else if (words === "turn off white lamp"){
    const newState = { state: false};
    // Update the device state in the backend
    await updateDeviceState("whiteLed", newState);
    setSpokenText(text);
  }
  //yellow LED
  else if(words === "turn on yellow lamp"){
    console.log(words)
    const newState = { state: true};
    // Update the device state in the backend
    await updateDeviceState("yellowLed", newState);
    setSpokenText(text);
  }else if(words === "turn off yellow lamp"){
    const newState = { state: false};
    // Update the device state in the backend
    await updateDeviceState("yellowLed", newState);
    setSpokenText(text);
  }
  // DOOR
  else if(words === "open door"){
    const newState = { state: true};
    // Update the device state in the backend
    await updateDeviceState("door", newState);
    setSpokenText(text);
  }else if(words === "close door"){
    const newState = { state: false};
    // Update the device state in the backend
    await updateDeviceState("door", newState);
    setSpokenText(text);
  }
  // WINDOW
  else if(words === "open window"){
    const newState = { state: true};
    // Update the device state in the backend
    await updateDeviceState("window", newState);
    setSpokenText(text);
  }else if(words === "close window"){
    const newState = { state: false};
    // Update the device state in the backend
    await updateDeviceState("window", newState);
    setSpokenText(text);
  }
  // BUZZER
  else if(words === "turn on buzzer"){
    const newState = { state: true};
    // Update the device state in the backend
    await updateDeviceState("buzzer", newState);
    setSpokenText(text);
  }else if(words === "turn off buzzer"){
    const newState = { state: false};
    // Update the device state in the backend
    await updateDeviceState("buzzer", newState);
    setSpokenText(text);
  }
  // FAN
  else if(words === "turn on fan"){
    const newState = { state: true};
    // Update the device state in the backend
    await updateDeviceState("fan", newState);
    setSpokenText(text);
  }else if(words === "turn off fan"){
    const newState = { state: false};
    // Update the device state in the backend
    await updateDeviceState("fan", newState);
    setSpokenText(text);
  }
  //Curtain
  else if(words === "open curtain"){
    const newState = { state: true};
    // Update the device state in the backend
    await updateDeviceState("curtain", newState);
    setSpokenText(text);
  }else if(words === "close curtain"){
    const newState = { state: false};
    // Update the device state in the backend
    await updateDeviceState("curtain", newState);
    setSpokenText(text);
  }

}