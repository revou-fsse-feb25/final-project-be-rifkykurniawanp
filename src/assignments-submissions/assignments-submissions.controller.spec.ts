import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentsSubmissionsController } from './assignments-submissions.controller';
import { AssignmentsSubmissionsService } from './assignments-submissions.service';

describe('AssignmentsSubmissionsController', () => {
  let controller: AssignmentsSubmissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignmentsSubmissionsController],
      providers: [AssignmentsSubmissionsService],
    }).compile();

    controller = module.get<AssignmentsSubmissionsController>(AssignmentsSubmissionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
