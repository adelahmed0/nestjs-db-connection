import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Not found user ${id}`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // 1) find user to update
    const userToUpdate = await this.findUserById(id);
    if (!userToUpdate) {
      throw new NotFoundException(`Not found user ${id}`);
    }
    // 2) update the element
    const updatedUser = { ...userToUpdate, ...updateUserDto };
    await this.usersRepository.save(updatedUser);
    return updatedUser;
  }

  async deleteUser(id: number): Promise<void> {
    await this.usersRepository.delete({ id });
  }
}
