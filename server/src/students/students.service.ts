// DEPENDENCIES
import { Injectable, NotFoundException } from '@nestjs/common';
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

  getStudents(): Promise<Students[]> {
    return this.studentsRepository.getStudents();
  }

  async getStudent(id: string): Promise<Students> {
    const found = await this.studentsRepository.getStudent(id);

    if (!found) {
      throw new NotFoundException(
        `The student with the given '${id}' ID was not found.`,
      );
    }

    return this.studentsRepository.getStudent(id);
  }
}
