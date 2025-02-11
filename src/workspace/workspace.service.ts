import { Injectable } from '@nestjs/common';
import { CommonService } from 'libs/commons/common-service/common-service';
import { Workspace } from './workspace.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateWorkspaceDto } from './dto/input/create-workspace.dto';

@Injectable()
export class WorkspaceService extends CommonService<Workspace> {
  constructor(
    @InjectModel(Workspace) private workspaceRepository: typeof Workspace,
  ) {
    super(Workspace);
  }

  async checkSlugAvailability(slug: string): Promise<string> {
    let availableSlug = slug;
    let count = 1;

    while (
      await this.workspaceRepository.findOne({ where: { slug: availableSlug } })
    ) {
      availableSlug = `${slug}${count}`;
      count++;
    }

    return availableSlug;
  }

  async createWorkspace(
    createWorkspaceDto: CreateWorkspaceDto,
    userId: number,
  ) {
    const newWorkspace = await this.workspaceRepository.create({
      ...createWorkspaceDto,
      userId,
    });

    return newWorkspace;
  }
}
