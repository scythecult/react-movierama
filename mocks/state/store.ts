import type { UserData } from '../../src/common/entities/auth';
import type { LocationData } from '../../src/common/entities/locations';
import { MOCK_LOCATIONS } from '../data/locations';
import { MOCK_USER, MOCK_USER_2 } from '../data/user';

export type PublicUser = Omit<UserData, 'password'>;

type LocationRecord = (typeof MOCK_LOCATIONS)[number];

const toPublicUser = (user: UserData): PublicUser => {
  const { password: _password, ...publicUser } = user;

  return publicUser;
};

const toLocation = (location: LocationRecord): LocationData => ({
  id: location.id,
  name: location.name,
});

const seedUsers = () => structuredClone([MOCK_USER, MOCK_USER_2]);

class MockApiStore {
  #users: UserData[] = seedUsers();
  #location: LocationData | null = null;

  reset = () => {
    this.#users = seedUsers();
    this.#location = null;
  };

  toPublicUser = toPublicUser;

  findUserById = (id: string) => this.#users.find((user) => user.id === id);

  findUserByEmail = (email: string) => this.#users.find((user) => user.email === email);

  findUserByPhone = (phone: string) => this.#users.find((user) => user.phone === phone);

  addUser = (user: UserData) => {
    this.#users.push(user);

    return user;
  };

  listLocations = () => MOCK_LOCATIONS.map(toLocation);

  findLocation = (id: number) => {
    const location = MOCK_LOCATIONS.find((item) => item.id === id);

    return location ? toLocation(location) : undefined;
  };

  findLocationByCity = (cityName: string) => {
    const location = MOCK_LOCATIONS.find((item) => item.alias === cityName);

    return location ? toLocation(location) : undefined;
  };

  getLocation = () => this.#location;

  setLocation = (location: LocationData) => {
    this.#location = location;

    return this.#location;
  };
}

export const mockApiStore = new MockApiStore();
