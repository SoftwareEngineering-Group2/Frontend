import httpClient from "./httpClient";

export const getDeviceState = async (deviceType: string) => {
  try {
    const response = await httpClient.get(`/device/${deviceType}/state`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const updateDeviceState = async (deviceType: string | undefined, newState: { state: boolean | undefined }) => {
  try {
    const response = await httpClient.post(`/device/${deviceType}`, newState);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const updateUsernames = async (uid: string, firstName: string, lastName: string) => {
  try {
    const response = await httpClient.post(`/user/${uid}`, {
      firstName: firstName,
      lastName: lastName
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
export const getUsername = async (uid: string) => {
  try {
    const response = await httpClient.get(`/user/${uid}`, {
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
export const getDeviceImage = async (deviceType: string) => {
  try {
    const response = await httpClient.get(`/device/${deviceType}/image`, {
    });
    return response.data.imageUrl;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const getDeviceNames = async () => {
  try {
    const response = await httpClient.get(`/devices/name`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const getAllDevices = async () => {
  try {
    const response = await httpClient.get(`/devices/state`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const setCoffeeMachineType = async (
  coffeeType: string
) => {
  try {
    // Update the coffee type e.g. Latte, Espresso, Americano
    const coffeeTypeResponse = await httpClient.post(`/device/coffeeMachine/coffeeType`, {
      newInformation: coffeeType
    });

    return {
      coffeeTypeUpdateResponse: coffeeTypeResponse.data,
    };

  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const updateMicrowaveOven = async (
  deviceState: boolean,
  ovenMode: string,
  ovenTimer: number
) => {
  try {
    const deviceStateString = String(deviceState);

    // Update the microwaveoven state
    const stateResponse = await httpClient.post(`/device/microOven/deviceState`, {
      newInformation: deviceStateString
    });

    // Update the ovenMode e.g. Defrost, 700w, 1000w
    const modeResponse = await httpClient.post(`/device/microOven/ovenMode`, {
      newInformation: ovenMode
    });

    // Update the timer e.g 1, 2, 3
    const timerResponse = await httpClient.post(`/device/microOven/ovenTimer`, {
      newInformation: ovenTimer
    });

    return {
      stateUpdateResponse: stateResponse.data,
      ovenModeUpdateResponse: modeResponse.data,
      ovenTimerUpdateResponse: timerResponse.data,
    };

  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const setMediaPlayerStatus = async (
  status: string,
) => {
  try {
    const StatusString = String(status);

    const stateResponse = await httpClient.post(`/device/mediaPlayer/status`, {
      newInformation: StatusString
    });

    return {
      stateUpdateResponse: stateResponse.data,
    };

  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

const handleApiError = (error: any) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('API Error:', error.response.data);
    console.error('Status Code:', error.response.status);
    console.error('Headers:', error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Request Error:', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error:', error.message);
  }
  console.error('Config:', error.config);
};
