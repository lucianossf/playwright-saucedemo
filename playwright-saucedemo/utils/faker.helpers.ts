import { faker } from '@faker-js/faker';

export const generateCheckoutData = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  postalCode: faker.location.zipCode('#####'),
});

export const generateInvalidCheckoutData = () => ({
  missingFirstName: {
    firstName: '',
    lastName: faker.person.lastName(),
    postalCode: faker.location.zipCode('#####'),
  },
  missingLastName: {
    firstName: faker.person.firstName(),
    lastName: '',
    postalCode: faker.location.zipCode('#####'),
  },
  missingPostalCode: {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postalCode: '',
  },
});
