import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssignmentsSubmissionsService } from './assignments-submissions.service';
import { CreateAssignmentsSubmissionDto } from './dto/request/submit-assignment.dto';
import { UpdateAssignmentsSubmissionDto } from './dto/request/update-submission.dto';

@Controller('assignments-submissions')
export class AssignmentsSubmissionsController {
  constructor(private readonly assignmentsSubmissionsService: AssignmentsSubmissionsService) {}

  @Post()
  create(@Body() createAssignmentsSubmissionDto: CreateAssignmentsSubmissionDto) {
    return this.assignmentsSubmissionsService.create(createAssignmentsSubmissionDto);
  }

  @Get()
  findAll() {
    return this.assignmentsSubmissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignmentsSubmissionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssignmentsSubmissionDto: UpdateAssignmentsSubmissionDto) {
    return this.assignmentsSubmissionsService.update(+id, updateAssignmentsSubmissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignmentsSubmissionsService.remove(+id);
  }
}
