// Remove the unused import statement
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Constants } from 'src/utils/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({ email: createUserDto.email });

    if(existingUser) {
      throw new Error('User already exists');
    }

    let user: User = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.role = Constants.ROLES.USER;

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findUserByEmail(email: string) {
    return this.userRepository.findOneOrFail({ where: { email: email } });
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
