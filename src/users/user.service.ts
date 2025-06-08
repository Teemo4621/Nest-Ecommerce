import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(username: string, email: string, password: string) {
    return this.repo.save({ username, email, password });
  }

  findAll() {
    return this.repo.find({
      select: [
        'id',
        'username',
        'email',
        'role',
        'money',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  findByUsername(username: string) {
    return this.repo.findOne({ where: { username } });
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async save(user: User) {
    return this.repo.update(user.id, user);
  }
}
