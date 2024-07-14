// DEPENDENCIES
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// DTOs
import { CreateStudentDto } from './dto/create-student.dto';

// ENTITIES
import { Students } from './students.entity';

// REPOSITORY
import { StudentsRepository } from './students.repository';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Students)
    private studentsRepository: StudentsRepository,
  ) {}

  createStudent(createStudentDto: CreateStudentDto): Promise<Students> {
    return this.studentsRepository.createStudent(createStudentDto);
  }
}
