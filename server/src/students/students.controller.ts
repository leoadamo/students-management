// DEPENDENCIES
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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

  @Get('/all')
  getStudents(): Promise<Students[]> {
    return this.studentsService.getStudents();
  }

  @Get(':id')
  getStudent(@Param('id') id: string): Promise<Students> {
    return this.studentsService.getStudent(id);
  }
}
