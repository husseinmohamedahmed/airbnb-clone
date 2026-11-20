import { Injectable } from "@nestjs/common";
import { InitializeSystemAdminUseCase } from "./usecases/initialize-system-admin.usecase";
import {OnModuleInit } from "@nestjs/common";
import { QueryFilter } from "mongoose";
import { SystemAdminRepository } from "./repositories/system-admin.repositroy";
import { SystemAdmin } from "./schemas/system-admin.schema";
import { SystemAdminResponse } from "./dtos/system-admin-response";
@Injectable()
export class SystemAdminService implements OnModuleInit { 
    constructor(private readonly initializeSystemAdminUseCase: InitializeSystemAdminUseCase,
        private readonly systemAdminRepository:SystemAdminRepository)
     {}

    async onModuleInit(): Promise<void> {
        await this.initializeSystemAdminUseCase.execute();
    }

    async findOne(query:QueryFilter<SystemAdmin>): Promise<SystemAdminResponse | null> {
      return  await this.systemAdminRepository.findOne(query);
    }
}