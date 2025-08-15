import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentSubmissionsController } from './assignment-submissions.controller';
import { AssignmentSubmissionsService } from './assignment-submissions.service';

describe('AssignmentsSubmissionsController', () => {
  let controller: AssignmentSubmissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignmentSubmissionsController],
      providers: [AssignmentSubmissionsService],
    }).compile();

    controller = module.get<AssignmentSubmissionsController>(AssignmentSubmissionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
