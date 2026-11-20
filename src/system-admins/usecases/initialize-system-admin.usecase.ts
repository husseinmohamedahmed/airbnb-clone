import { EnviromentInterface, ISystemAdminEnviroment } from '../../common/configuration/enviroment.interface';
import { SystemAdminRepository } from '../repositories/system-admin.repositroy';
import { ConfigService } from '@nestjs/config';
import { Logger,Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';

@Injectable()
export class InitializeSystemAdminUseCase {
    private logger= new Logger(InitializeSystemAdminUseCase.name);
    constructor(private readonly systemAdminRepository: SystemAdminRepository,
        private readonly configService:ConfigService<EnviromentInterface>)
     {};
   async execute():Promise<void>{
    const {name,email,password}=this.configService.getOrThrow<ISystemAdminEnviroment>('systemadmin');
    const systemAdmin=await this.systemAdminRepository.findOne({email});
    if(systemAdmin){
        if (systemAdmin.password === password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await this.systemAdminRepository.findOneAndUpdate(
                { email },
                { password: hashedPassword },
            );
            this.logger.log('System Admin password hash upgraded');
            return;
        }
        this.logger.log('System Admin already exists');
        return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.systemAdminRepository.create({name,email,password: hashedPassword,isSuperAdmin:true});
    this.logger.log('System Admin created successfully');
   };
}