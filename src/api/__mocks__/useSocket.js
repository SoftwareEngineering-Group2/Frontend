export const useSocket = jest.fn(() => ({
  allDevices: [{ id: 1, name: 'Device 1' }, { id: 2, name: 'Device 2' }],
  message: 'Test message',
  lastUpdated: 'allDevices',
}));