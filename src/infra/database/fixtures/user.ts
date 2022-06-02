import { User } from '../entities';

export const userFixtures: Omit<User, 'isActive' | 'address' | 'producer'>[] = [
  {
    id: '90baed0b-6c04-401a-92d7-94641228d008',
    email: 'produtor@outlook.com',
    name: 'PRODUTOR',
    password: '$2b$04$TTz9NirNAcXBAZifLLJiRuP/Ay7CISHqa5W.xlK3wS/nkYljc5DFq', // 12345678
    phone: '00000000001',
    document: '2+mYHtEkT/lUyVCPkapkH0SGXfYXAoTorQkIXtmRnrM=' // 020.422.520-50
  },
  {
    id: '8302f435-243a-480b-a7a3-2a0aaab0c27d',
    email: 'consumidor@outlook.com',
    name: 'Consumidor',
    password: '$2b$04$6FeMotCYjRH7m3UkJm/rEO6NHeeaU2FhHKi3lZGv1BS9GkZrIMwMu', // 1234
    phone: '00000000002',
    document: '157.225.660-55'
  }
];
