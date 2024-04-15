const mockAxios = jest.genMockFromModule('axios');

mockAxios.get = jest.fn().mockImplementation(url => {
  if (url === '/api/devices') {
    return Promise.resolve({
      data: [
        { id: 1, name: 'Coffee Machine', status: true, imageUrl: 'image-url-1' },
        { id: 2, name: 'Microwave Oven', status: false, imageUrl: 'image-url-2' },
      ],
    });
  }

  return Promise.reject(new Error('not found'));
});

mockAxios.create = jest.fn(() => mockAxios);

export default mockAxios;