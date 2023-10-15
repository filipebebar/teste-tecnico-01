export const minutesData = {
  slotId: '1dbf9347-f861-4358-b883-2b227bb08fbc',
  minutes: 3,
};

export const doctorsData = [
  { slotId: '71621e15-6611-4014-870d-129c54b6b4c9', name: 'Garibalde Afonso' },
  { slotId: '5497403e-49bf-4629-af09-540daf286272', name: 'Naruto' },
  { slotId: '964f3c45-ea6a-4fd6-9738-771263edd487', name: 'Darth Vader' },
  { slotId: 'ccf64a6f-cbfb-4cd4-9bb8-3bbb0a6f3ae9', name: 'Ashoka' },
  { slotId: '261621e7-f8aa-4d54-a90f-e7ffe11315a9', name: 'Micalateia' },
  { slotId: '0e7955c1-8ed4-491c-a0af-7d2433c66740', name: 'Godah' },
];

export const unitsData = [
  { slotId: '16535468-7884-4136-96a9-bbc17773b8ff', name: 'Afonso Pena' },
  { slotId: 'e5fdeab6-15b8-4da7-a9ac-afe9adfc6209', name: 'Airton Senna' },
  { slotId: '2143b260-f4d6-44ad-bd59-a93d5c11a68f', name: 'Flamengo' },
  { slotId: '5a288cc0-42cb-425e-8148-ea0fca123db7', name: 'Vasco' },
];

export const specialitiesData = [
  { slotId: '8a5b993d-eb45-48ee-8f4f-4b4976bf40a8', name: 'Ortopedia' },
  { slotId: 'a8da6b1c-8488-4a33-9a18-e2ef0259686a', name: 'Pediatria' },
  { slotId: '2c7808a2-c1f3-4ed8-a936-b0cc498027ed', name: 'Cardiologia' },
  { slotId: '51deb90d-57e7-466e-ae81-ea653bfd7e1b', name: 'Nutricionista' },
];

export const schedulesData = [
  {
    slotId: '30ae1c40-83ba-40c4-99fa-ddcd6ce39a7e',
    startDate: '2023-10-14T09:00:00.068Z',
    endDate: '2023-10-14T09:30:00.068Z',
    reserved: false,
    scheduled: false,
    speciality: {
      slotId: specialitiesData[0].slotId,
      name: specialitiesData[0].name,
    },
    unit: {
      slotId: unitsData[0].slotId,
      name: unitsData[0].name,
    },
    doctor: {
      slotId: doctorsData[0].slotId,
      name: doctorsData[0].name,
    },
  },
  {
    slotId: '65530b7b-c790-485d-b66d-2bee14485b4b',
    startDate: new Date('2023-10-14T10:00:00.068Z'),
    endDate: new Date('2023-10-14T10:30:00.068Z'),
    reserved: false,
    scheduled: false,
    speciality: {
      slotId: specialitiesData[1].slotId,
      name: specialitiesData[1].name,
    },
    unit: {
      slotId: unitsData[1].slotId,
      name: unitsData[1].name,
    },
    doctor: {
      slotId: doctorsData[1].slotId,
      name: doctorsData[1].name,
    },
  },
  {
    slotId: '66cad5af-6eb0-415c-a3f0-d675df6ceefa',
    startDate: new Date('2023-10-14T11:00:00.068Z'),
    endDate: new Date('2023-10-14T11:30:00.068Z'),
    reserved: false,
    scheduled: false,
    speciality: {
      slotId: specialitiesData[2].slotId,
      name: specialitiesData[2].name,
    },
    unit: {
      slotId: unitsData[1].slotId,
      name: unitsData[1].name,
    },
    doctor: {
      slotId: doctorsData[2].slotId,
      name: doctorsData[2].name,
    },
  },
  {
    slotId: '350bb464-8072-493c-a3f2-7ea4ac8ed849',
    startDate: new Date('2023-10-14T12:00:00.068Z'),
    endDate: new Date('2023-10-14T12:30:00.068Z'),
    reserved: false,
    scheduled: false,
    speciality: {
      slotId: specialitiesData[3].slotId,
      name: specialitiesData[3].name,
    },
    unit: {
      slotId: unitsData[1].slotId,
      name: unitsData[1].name,
    },
    doctor: {
      slotId: doctorsData[3].slotId,
      name: doctorsData[3].name,
    },
  },
  {
    slotId: 'fe275cdb-24bb-442e-b8c6-790554b718b8',
    startDate: new Date('2023-10-14T13:00:00.068Z'),
    endDate: new Date('2023-10-14T13:30:00.068Z'),
    reserved: false,
    scheduled: false,
    speciality: {
      slotId: specialitiesData[3].slotId,
      name: specialitiesData[3].name,
    },
    unit: {
      slotId: unitsData[3].slotId,
      name: unitsData[3].name,
    },
    doctor: {
      slotId: doctorsData[4].slotId,
      name: doctorsData[4].name,
    },
  },
  {
    slotId: '70d328ef-a68e-4ddd-a875-cd3fd3ffcadc',
    startDate: new Date('2023-10-14T14:00:00.068Z'),
    endDate: new Date('2023-10-14T14:30:00.068Z'),
    reserved: false,
    scheduled: false,
    speciality: {
      slotId: specialitiesData[2].slotId,
      name: specialitiesData[2].name,
    },
    unit: {
      slotId: unitsData[3].slotId,
      name: unitsData[3].name,
    },
    doctor: {
      slotId: doctorsData[5].slotId,
      name: doctorsData[5].name,
    },
  },
];
