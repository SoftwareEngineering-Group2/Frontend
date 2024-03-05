import httpClient from "./httpClient";

export const getDeviceState = (deviceType: string) => {
  return httpClient.get(`/device/${deviceType}/state`);
}

export const updateDeviceState = (deviceType: string, newState: { state: string }) => {
  return httpClient.post(`/device/${deviceType}`, newState);
};

export const getDeviceImage = (deviceType: string) => {
  return httpClient.get(`/device/${deviceType}/image`);
};

export const getDeviceNames = () => {
  return httpClient.get(`/devices/name`);
};