import { User } from '../entities';

export const userFixtures: Omit<User, 'isActive' | 'address' | 'producer'>[] = [
  {
    id: '8302f435-243a-480b-a7a3-2a0aaab0c27d',
    email: 'consumidor@outlook.com',
    name: 'Consumidor',
    password: '$2b$04$6FeMotCYjRH7m3UkJm/rEO6NHeeaU2FhHKi3lZGv1BS9GkZrIMwMu', // 1234
    phone: '00000000001',
    document: '157.225.660-55'
  },
  {
    id: 'd9f35eb5-ac5a-4584-9f34-64469ac1fc2e',
    email: 'produtor@outlook.com',
    name: 'Produtor',
    password: '$2b$04$6FeMotCYjRH7m3UkJm/rEO6NHeeaU2FhHKi3lZGv1BS9GkZrIMwMu', // 1234
    phone: '00000000002',
    document: '527.815.850-68'
  }
];
