import { Body, Controller, Get, Post,Request, UseGuards } from '@nestjs/common/decorators';
import { WorkspaceService } from './workspace.service';
import { Param } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/input/create-workspace.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller({
  version: '5',
  path: 'workspace',
})
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get('check-slug/:slug')
  async checkSlug(@Param('slug') slug: string) {
    return {
      availableSlug: await this.workspaceService.checkSlugAvailability(slug),
    };
  }

  @UseGuards(JwtAuthGuard) 
  @Post()
  async create(@Body() createWorkspaceDto: CreateWorkspaceDto, @Request() req) {
    const userId = req.user.id; 
    return this.workspaceService.createWorkspace(createWorkspaceDto, userId);
  }
}
