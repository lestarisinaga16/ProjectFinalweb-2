import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDTO } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

// Simpan data pengguna di memory untuk demo
const users = new Map<string, { username: string; email: string; passwordHash: string }>();

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = users.get(email);
    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayloadDto = { sub: email, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        email: user.email,
        username: user.username,
      },
    };
  }

  async register(registerDto: RegisterDTO) {
    if (users.has(registerDto.email)) {
      throw new HttpException(
        'Email already exists',
        HttpStatus.CONFLICT,
      );
    }

    const passwordHash = bcrypt.hashSync(registerDto.password, 10);
    users.set(registerDto.email, {
      email: registerDto.email,
      username: registerDto.username,
      passwordHash,
    });

    return { message: 'Registration successful' };
  }
}