import VueRouter from 'vue-router';
import { mount, createLocalVue } from '@vue/test-utils';
import routes from '@/app/routes';
import NotFoundComponent from '@/app/shared/components/NotFound.vue';
import AboutComponent from '@/app/about/About.vue';

const mock = () => new VueRouter({
  mode: 'abstract',
  routes,
});

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = mock();

describe('when route is not defined', () => {
  test('should return a NotFoundComponent', () => {
    const wrapper = mount(NotFoundComponent, {
      localVue,
      router,
    });

    router.push('/nested-route');
    expect(wrapper.find(NotFoundComponent).exists()).toBe(true);
  });

  test('should return a Not Found text', () => {
    const wrapper = mount(NotFoundComponent, {
      localVue,
      router,
    });

    router.push('/nested-route');
    expect(wrapper.find('p').exists()).toBe(true);
    expect(wrapper.find('p').text().trim()).toBe('Not Found');
  });
});

describe('when about route is defined', () => {
  test('should return an AboutComponent', () => {
    const wrapper = mount(AboutComponent, {
      localVue,
      router,
    });

    router.push('/about');
    expect(wrapper.find(AboutComponent).exists()).toBe(true);
  });
});
