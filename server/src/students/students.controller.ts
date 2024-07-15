// DEPENDENCIES
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

// DTOs
import { CreateStudentDto } from './dto/create-student.dto';

// ENTITIES
import { Student } from './student.entity';

// SERVICES
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Post('/create')
  createStudent(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentsService.createStudent(createStudentDto);
  }

  @Get('/all')
  getStudents(): Promise<Student[]> {
    return this.studentsService.getStudents();
  }

  @Get(':id')
  getStudent(@Param('id') id: string): Promise<Student> {
    return this.studentsService.getStudent(id);
  }
}
