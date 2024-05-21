import { useSocket } from '../useSocket';

// Mock the useSocket hook
jest.mock('../useSocket');

describe('useSocket', () => {
  test('returns the correct data from the hook', () => {
    const { allDevices, message, lastUpdated } = useSocket();

    expect(allDevices).toEqual([{ id: 1, name: 'Device 1' }, { id: 2, name: 'Device 2' }]);
    expect(message).toBe('Test message');
    expect(lastUpdated).toBe('allDevices');
  });
});