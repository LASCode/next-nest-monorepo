import { User } from './user.types';

export const MockedMe: User = {
  id: 'TestId',
  name: 'TestUsername',
  username: 'TestUserAlias',
  roles: ['EMPLOYEE'],
  avatar: 'https://cdn-icons-png.flaticon.com/512/924/924915.png',
};
export const MockedUsers: User[] = [MockedMe, MockedMe, MockedMe, MockedMe];
