import { mount } from '@vue/test-utils';
import HomeComponent from '@/app/home/Home.vue';

let wrapper = {};
beforeEach(() => {
  wrapper = mount(HomeComponent);
});

describe('Home Component Basics', () => {
  test('should return home', () => {
    expect(wrapper.vm.$data.name).toBe('home');
  });
});
