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

export const updateDeviceState = async (deviceType: string, newState: { state: string }) => {
  try {
    const response = await httpClient.post(`/device/${deviceType}`, newState);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const getDeviceImage = async (deviceType: string) => {
  try {
    const response = await httpClient.get(`/device/${deviceType}/image`);
    return response.data;
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
