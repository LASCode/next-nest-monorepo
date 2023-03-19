import { User } from './user.types';

export const MockedMe: User = {
  id: 'TestId',
  name: 'TestUsername',
  username: 'TestUserAlias',
  roles: ['EMPLOYEE'],
  avatar: 'https://cdn-icons-png.flaticon.com/512/924/924915.png',
};
export const MockedUsers: User[] = [
    MockedMe,
  {
    avatar: 'https://picsum.photos/200/300',
    id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    name: 'TestUsername1',
    username: 'TestUserAlias1',
    roles: ['EMPLOYEE'],
  },
  {
    avatar: 'https://picsum.photos/200/300',
    id: '9b1deb4d-3b7d',
    name: 'TestUsername2',
    username: 'TestUserAlias2',
    roles: ['EMPLOYEE'],
  },
  {
    avatar: 'https://picsum.photos/200/300',
    id: '9b1deb4d-3b7d-4bad',
    name: 'TestUsername3',
    username: 'TestUserAlias3',
    roles: ['EMPLOYEE'],
  },
  {
    avatar: 'https://picsum.photos/200/300',
    id: '9b1de',
    name: 'TestUsername4',
    username: 'TestUserAlias4',
    roles: ['EMPLOYEE'],
  },
  {
    avatar: 'https://picsum.photos/200/300',
    id: '9b1deb4d-3b7d-4bad-9bdd',
    name: 'TestUsername5',
    username: 'TestUserAlias5',
    roles: ['EMPLOYEE'],
  },
  {
    avatar: 'https://picsum.photos/200/300',
    id: '9b1deb4d-3b7d-4bad-9bdd-2b',
    name: 'TestUsername6',
    username: 'TestUserAlias6',
    roles: ['EMPLOYEE'],
  },
];
