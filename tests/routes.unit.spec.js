import VueRouter from 'vue-router';
import { mount, createLocalVue } from '@vue/test-utils';
import routes from '@/app/routes';
import NotFoundComponent from '@/app/shared/components/NotFound.vue';
// import AboutComponent from '@/app/about/About.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('when route is not defined', () => {
  test('should return a NotFoundComponent', async () => {
    try {
      const router = new VueRouter({
        mode: 'abstract',
        routes,
      });
      const wrapper = mount(NotFoundComponent, {
        localVue,
        router,
      });

      router.push('/nested-route');
      await wrapper.vm.$nextTick();

      expect(wrapper.find(NotFoundComponent).exists()).toBe(true);
    } catch (error) {
      console.log(error);
    }
  });

  test('should return a Not Found text', async () => {
    try {
      const router = new VueRouter({
        mode: 'abstract',
        routes,
      });
      const wrapper = mount(NotFoundComponent, {
        localVue,
        router,
      });

      router.push('/nested-route');
      await wrapper.vm.$nextTick();

      expect(wrapper.find('p').exists()).toBe(true);
      expect(wrapper.find('p').text().trim()).toBe('Not Found');
    } catch (error) {
      console.log(error);
    }
  });
});

// describe('when about route is defined', () => {
//   test('should return an AboutComponent', async () => {
//     try {
//       const router = new VueRouter({
//         mode: 'abstract',
//         routes,
//       });
//       const wrapper = mount(AboutComponent, {
//         localVue,
//         router,
//       });

//       router.push('/about');
//       await wrapper.vm.$nextTick();

//       expect(wrapper.find(AboutComponent).exists()).toBe(true);
//     } catch (error) {
//       console.log(error);
//     }
//   });
// });
