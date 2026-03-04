import { Test, TestingModule } from '@nestjs/testing';
import { JobPostionController } from './job-postion.controller';
import { JobPostionService } from './job-postion.service';

describe('JobPostionController', () => {
  let controller: JobPostionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobPostionController],
      providers: [JobPostionService],
    }).compile();

    controller = module.get<JobPostionController>(JobPostionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
