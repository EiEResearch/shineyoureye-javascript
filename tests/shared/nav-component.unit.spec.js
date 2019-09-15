import { mount, createLocalVue } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import NavComponent from '@/app/shared/components/Nav.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

let wrapper = {};
beforeEach(() => {
  wrapper = mount(NavComponent, {
    localVue,
  });
});

describe('Navigation.Component', () => {
  test('should contain 9 master links', () => {
    const navItems = wrapper.find('nav').findAll('.navbar-nav').at(0).findAll('.nav-item');
    expect(navItems.length).toBe(9);
  });

  test('should have Home as first nav element', () => {
    const firstItem = wrapper.find('nav').findAll('.navbar-nav').at(0)
      .findAll('.nav-item')
      .at(0);
    expect(firstItem.text()).toBe('Home');
  });

  test('should have "Democracy Resources" as first nav element', () => {
    const firstItem = wrapper.find('nav').findAll('.navbar-nav').at(0)
      .findAll('.nav-item')
      .at(1);
    expect(firstItem.text()).toBe('Democracy Resources');
  });

  test('should have Contact as last nav element', () => {
    const firstItem = wrapper.find('nav').findAll('.navbar-nav').at(0)
      .findAll('.nav-item')
      .at(8);
    expect(firstItem.text()).toBe('Contact');
  });
});
