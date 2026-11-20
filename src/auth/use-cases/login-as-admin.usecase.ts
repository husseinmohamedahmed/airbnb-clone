import { Injectable } from "@nestjs/common";
import { SystemAdminService } from "../../system-admins/system-admin.service"
import { LoginDto } from "../dtos/login.dto";
import { BadRequestException } from "../../common/errors-handling/custom-exceptions/bad-request.exception";
import bcrypt from 'bcryptjs';
import {GenerateTokenUsecase} from './generate-token.usecase'
import { AuthResponseDto } from "../dtos/auth-response.dto";
import { plainToInstance } from "class-transformer";
@Injectable()
export class LoginAsAdminUsecase {
  constructor(private readonly systemAdminService: SystemAdminService,
    private readonly generateTokenUsecase:GenerateTokenUsecase
  ) {}
  async execute(body:LoginDto): Promise<AuthResponseDto> {
    const systemAdmin = await this.systemAdminService.findOne({ email: body.email
  }    )
  if(!systemAdmin){
    throw new BadRequestException('Invalid credentials');
  }
  const passwordChecked= await bcrypt.compare(body.password, systemAdmin.password);
  if(passwordChecked==false){
    throw new BadRequestException('Invalid credentials');
  }
 const { accessToken, refreshToken } =
   await this.generateTokenUsecase.execute({id:systemAdmin._id.toString(),role:body.role}); 
   return  plainToInstance(AuthResponseDto, { accessToken, refreshToken });}
}