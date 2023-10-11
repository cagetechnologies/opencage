import { PluginFactory } from './plugin-factory';

describe('PluginFactory', () => {
  it('should create an instance', () => {
    expect(new PluginFactory()).toBeTruthy();
  });
});
