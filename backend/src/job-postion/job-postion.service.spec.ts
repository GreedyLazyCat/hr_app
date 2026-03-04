import { Test, TestingModule } from '@nestjs/testing';
import { JobPostionService } from './job-postion.service';

describe('JobPostionService', () => {
  let service: JobPostionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobPostionService],
    }).compile();

    service = module.get<JobPostionService>(JobPostionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
