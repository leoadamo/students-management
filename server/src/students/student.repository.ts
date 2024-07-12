// DEPENDENCIES
import { Repository } from 'typeorm';

// DTOs
import { CreateStudentDto } from './dto/create-student.dto';

// ENTITIES
import { Student } from './student.entity';

export interface StudentRepository extends Repository<Student> {
  this: Repository<Student>;
  createStudent(student: CreateStudentDto);
  getStudent(id: string): Promise<Student>;
  getStudents(): Promise<Student[]>;
}

export const customStudentRepository: Pick<StudentRepository, any> = {
  createStudent(this: Repository<Student>, student) {
    return this.save(student);
  },

  getStudent(this: Repository<Student>, id) {
    return this.findOne({ where: { id } });
  },

  getStudents(this: Repository<Student>) {
    return this.find();
  },
};
