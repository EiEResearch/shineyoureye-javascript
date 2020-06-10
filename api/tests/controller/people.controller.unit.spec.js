// /* eslint-disable no-unused-expressions */
// import PeopleController from 'api/controller/people.controller';

// jest.mock('api/controller/people.controller');
// const people = [{
//   organization: 'Governors',
//   legislative_period: 'Executive',
//   start_date: '2019-06-11',
//   end_date: '2023-06-11',
//   position: 'Governor',
//   persons: [{
//     id: 'gov:victor-okezie-ikpeazu',
//     title: 'Dr',
//     name: 'Okezie Ikpeazu',
//     official_name: 'Okezie Ikpeazu',
//     state: 'Abia',
//     area: {
//       place: {
//         parent_area: null,
//         generation_high: 1,
//         all_names: {},
//         id: 2,
//         codes: {
//           poll_unit: 'AB',
//         },
//         name: 'Abia',
//         country: 'N',
//         type_name: 'State',
//         generation_low: 1,
//         country_name: 'Nigeria',
//         type: 'STA',
//       },
//       place_url: 'abia',
//       url: '/place/abia',
//       image: {
//         url: 'https://theyworkforyou.github.io/shineyoureye-images/Static/assets/images/thumbnails/abia.jpg',
//       },
//       parent_place: {},
//       state_place: {
//         parent_area: null,
//         generation_high: 1,
//         all_names: {},
//         id: 2,
//         codes: {
//           poll_unit: 'AB',
//         },
//         name: 'Abia',
//         country: 'N',
//         type_name: 'State',
//         generation_low: 1,
//         country_name: 'Nigeria',
//         type: 'STA',
//       },
//     },
//     party: 'Peoples Democratic Party',
//     birth_date: '1964-10-18',
//     gender: 'Male',
//     slug: 'okezie-ikpeazu',
//     url: '/person/okezie-ikpeazu',
//     summary_doc: {
//       title: '',
//       slug: '',
//       published: '',
//       featured: '',
//       url: '',
//       author: '',
//       body: '',
//     },
//     address: {
//       postal_address: {
//         type: 'postal address',
//         value: '',
//       },
//       district: {
//         type: 'district',
//         value: '',
//       },
//     },
//     other_names: [
//       'Okezie Ikpeazu',
//     ],
//     contact: {
//       phone: {
//         type: 'phone',
//         value: '2348053387018',
//         note: '',
//       },
//       email: {
//         type: 'email',
//         value: 'info@abiastate.gov.ng',
//         note: 'mailto:info@abiastate.gov.ng',
//       },
//       facebook: {
//         type: 'facebook',
//         value: '',
//         note: '',
//       },
//       twitter: {
//         type: 'twitter',
//         value: '@GovernorIkpeazu',
//         note: 'https://twitter.com/GovernorIkpeazu',
//       },
//     },
//     images: {
//       thumbnail: {
//         url: 'https://theyworkforyou.github.io/shineyoureye-images/Governors/gov:victor-okezie-ikpeazu/100x100.jpeg',
//       },
//       medium: {
//         url: 'https://theyworkforyou.github.io/shineyoureye-images/Governors/gov:victor-okezie-ikpeazu/250x250.jpeg',
//       },
//       original: {
//         url: 'https://theyworkforyou.github.io/shineyoureye-images/Governors/gov:victor-okezie-ikpeazu/original.jpeg',
//       },
//     },
//     links: {
//       wikipedia: {
//         note: 'wikipedia',
//         url: '',
//       },
//       website: {
//         note: 'website',
//         url: '',
//       },
//     },
//     identifiers: {
//       official_position: {
//         identifier: 'official_position',
//         value: '',
//       },
//       official_position_order: {
//         identifier: 'official_position_order',
//         value: '',
//       },
//     },
//   }],
// }];

// const req = {
//   params: {
//     state: '',
//     legislature: '',
//   },
//   err: {
//     error: {
//       message: 'internal server error',
//       code: 500,
//       details: [],
//       target: '',
//     },
//   },
// };

// const res = {
//   json: obj => obj,
//   send: obj => obj,
//   status: code => code,
// };


// describe('PeopleController', () => {
//   req.params.legislature = 'governors';

//   test('should get a single legisltaure politicians grouped by state', async () => {
//     PeopleController.getSingleLegislatureByState.mockReturnValue({
//       success: true,
//       message: 'data found',
//       data: { people },
//     });
//     const d = await PeopleController.getSingleLegislatureByState(req, res);

//     expect(PeopleController.getSingleLegislatureByState).toHaveBeenCalled;
//     expect(d.data.people.length).toBe(1);
//   });
// });

// describe('PeopleController::Logger', () => {
//   test('should ', () => {
//     expect(true).toBe(true);
//   });
// });

describe('Name of the group', () => {
  test('should equal 1', () => {
    expect(1).toBe(1);
  });
});
