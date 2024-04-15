export const Voice = {
  start: jest.fn(),
  stop: jest.fn(),
  onSpeechStart: jest.fn(),
  onSpeechEnd: jest.fn(),
  onSpeechResults: jest.fn(),
  addListener: jest.fn(() => ({
    remove: jest.fn(),
  })),
}