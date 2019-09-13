import { mount } from '@vue/test-utils';
import HeaderComponent from '@/app/shared/components/Header.vue';

let wrapper = {};
beforeEach(() => {
  wrapper = mount(HeaderComponent);
});

describe('Home.Component', () => {
  test('should output HeaderComponent', () => {
    const componentName = wrapper.vm.$options.name;
    expect(componentName).toBe('HeaderComponent');
  });
});
