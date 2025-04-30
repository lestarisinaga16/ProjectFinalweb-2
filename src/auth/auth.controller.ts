import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ 
    status: 200, 
    description: 'Login successful',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          email: 'user@example.com',
          username: 'username'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  signIn(@Body() signInDto: LoginDTO) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ 
    status: 201, 
    description: 'Registration successful',
    schema: {
      example: {
        message: 'Registration successful'
      }
    }
  })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  register(@Body() registerDto: RegisterDTO) {
    return this.authService.register(registerDto);
  }
}