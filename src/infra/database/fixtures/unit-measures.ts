import { UnitMeasure } from '../entities';

export const unitMeasuresFixtures: Omit<UnitMeasure, 'isActive' | 'producerProducts'>[] = [
  {
    id: '7b4434df-183e-446b-a6b6-c5e506c19504',
    name: 'Quilo',
    abbreviation: 'kg'
  },
  {
    id: '2b73bd13-8390-4e46-8c84-b32ee49e2ddb',
    name: 'Penca',
    abbreviation: 'penca'
  },
  {
    id: '62af282b-4350-4cea-8cbf-4dcdc2adefb0',
    name: 'Litro',
    abbreviation: 'L'
  },
  {
    id: 'd5308196-1908-47d6-87b3-4fdee2747041',
    name: 'Duzia',
    abbreviation: 'duzia'
  },
  {
    id: 'f5553229-857e-49c6-9980-1e2d12e60cc8',
    name: 'Grama',
    abbreviation: 'g'
  },
  {
    id: '93ea4a31-54fb-4bef-b09e-4050b56be3ee',
    name: 'Miligrama',
    abbreviation: 'mg'
  },
  {
    id: 'f6820857-afec-4cf1-a2c6-01fca0fb572c',
    name: 'Unidade',
    abbreviation: 'un'
  },
  {
    id: 'bc14aab3-d9c7-496a-a110-6b1b359ebf1c',
    name: 'Saco',
    abbreviation: 'saco'
  }
];
