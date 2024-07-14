// DEPENDENCIES
import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';
import {
  getDataSourceToken,
  getRepositoryToken,
  TypeOrmModule,
} from '@nestjs/typeorm';

// CONTROLLERS
import { StudentsController } from './students.controller';

// ENTITIES
import { Students } from './students.entity';

// SERVICES
import { StudentsService } from './students.service';

// REPOSITORIES
import { customStudentsRepository } from './students.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Students])],
  controllers: [StudentsController],
  providers: [
    {
      provide: getRepositoryToken(Students),
      inject: [getDataSourceToken()],
      useFactory(datasource: DataSource) {
        return datasource
          .getRepository(Students)
          .extend(customStudentsRepository);
      },
    },
    StudentsService,
  ],
})
export class StudentsModule {}
