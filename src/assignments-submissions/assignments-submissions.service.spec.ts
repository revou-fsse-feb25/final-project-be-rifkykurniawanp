import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentSubmissionService } from './assignment-submissions.service';

describe('AssignmentsSubmissionsService', () => {
  let service: AssignmentSubmissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignmentSubmissionService],
    }).compile();

    service = module.get<AssignmentSubmissionService>(AssignmentSubmissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
