import { mount } from '@vue/test-utils';
import About from '@/app/about/About.vue';

describe('About.vue', () => {
  test('data.name default value returns "boy"', () => {
    expect.assertions(2);
    const msg = 'About';
    const wrapper = mount(About);
    expect(wrapper.vm.$data.name).toBe('boy');
    expect(wrapper.name()).toBe(msg);
  });

  test('data.name can be accessed', () => {
    const wrapper = mount(About);
    wrapper.setData({ name: 'girl' });
    expect(wrapper.vm.name).toBe('girl');
  });
});
