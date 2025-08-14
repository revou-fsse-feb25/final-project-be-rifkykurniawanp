import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentsSubmissionsService } from './assignments-submissions.service';

describe('AssignmentsSubmissionsService', () => {
  let service: AssignmentsSubmissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignmentsSubmissionsService],
    }).compile();

    service = module.get<AssignmentsSubmissionsService>(AssignmentsSubmissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
