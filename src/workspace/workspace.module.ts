import { Workspace } from './workspace.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';

@Module({
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
  imports: [SequelizeModule.forFeature([Workspace])],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}
