export type CreateAddressDTO = {
  state: string;
  city: string;
  district: string;
  street: string;
  zipCode: string;
  number?: number;
  complement?: string;
};
