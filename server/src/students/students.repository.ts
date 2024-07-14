// DEPENDENCIES
import { Repository } from 'typeorm';

// DTOs
import { CreateStudentDto } from './dto/create-student.dto';

// ENTITIES
import { Students } from './students.entity';

export interface StudentsRepository extends Repository<Students> {
  this: Repository<Students>;
  createStudent(Students: CreateStudentDto);
  getStudent(id: string): Promise<Students>;
  getStudents(): Promise<Students[]>;
}

export const customStudentsRepository: Pick<StudentsRepository, any> = {
  createStudent(this: Repository<Students>, Students) {
    return this.save(Students);
  },

  getStudent(this: Repository<Students>, id) {
    return this.findOne({ where: { id } });
  },

  getStudents(this: Repository<Students>) {
    return this.find();
  },
};
