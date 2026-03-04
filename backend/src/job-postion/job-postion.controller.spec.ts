import { Test, TestingModule } from '@nestjs/testing';
import { JobPositionController } from './job-postion.controller';
import { JobPositionService } from './job-postion.service';

describe('JobPostionController', () => {
  let controller: JobPositionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobPositionController],
      providers: [JobPositionService],
    }).compile();

    controller = module.get<JobPositionController>(JobPositionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
