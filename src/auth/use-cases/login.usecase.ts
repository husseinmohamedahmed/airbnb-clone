import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { LoginAsUserUsecase } from './login-as-user.usecase';
import { LoginAsAdminUsecase } from './login-as-admin.usecase';

@Injectable()
export class LoginUsecase {
  constructor(private readonly loginAsAdminUsecase: LoginAsAdminUsecase, private readonly loginAsUserUsecase : LoginAsUserUsecase ) {}

  async execute(body: LoginDto): Promise<AuthResponseDto> {
    const role=body.role;
    
    if(role.includes('admin')){
        return await this.loginAsAdminUsecase.execute(body);
    } 
     return await this.loginAsUserUsecase.execute(body);

    }
  
}