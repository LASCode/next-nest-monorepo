import {HttpException, Injectable} from '@nestjs/common';
import { MockedMe, MockedUsers } from './user.constants';
import { User } from './user.types';

@Injectable()
export class UserService {
  async findUserById(id: string): Promise<User | undefined> {
    const response: User[] = await new Promise((resolve) =>
      setTimeout(() => resolve(MockedUsers), 500),
    );
    return response.find((user) => user.id === id);
  }
  async getUserByAuthToken(token: string): Promise<User | undefined> {
    return this.getMe();
  }

  async getMe(): Promise<User> {
    return await new Promise((resolve) =>
      setTimeout(() => resolve(MockedMe), 500),
    );
  }
  async getUsers(): Promise<User[]> {
    return await new Promise((resolve) =>
      setTimeout(() => resolve(MockedUsers), 500),
    );
  }
  async getUser(id: string): Promise<User> {
    return await new Promise((resolve) =>
        setTimeout(async () => {
          const users = await this.getUsers();
          const currentUser = users.find((el) => el.id === id);
          if (!currentUser) throw new HttpException('Юзер не найден', 404);
          resolve(currentUser);
        }, 500),
    );
  }
}
