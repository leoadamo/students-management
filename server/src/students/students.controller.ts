// DEPENDENCIES
import { Body, Controller, Post } from '@nestjs/common';

// DTOs
import { CreateStudentDto } from './dto/create-student.dto';

// ENTITIES
import { Students } from './students.entity';

// SERVICES
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Post('/create')
  createStudent(@Body() createStudentDto: CreateStudentDto): Promise<Students> {
    return this.studentsService.createStudent(createStudentDto);
  }
}
