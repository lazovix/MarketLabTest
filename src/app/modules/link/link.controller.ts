import { Body, Controller, Post, Get, Header, Param, NotFoundException } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags, ApiProduces, ApiParam } from '@nestjs/swagger';

import { LinkService } from './link.service';

@ApiTags('Link')
@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  @ApiConsumes('text/plain')
  @ApiBody({ schema: { type: 'string', example: 'text' } })
  @ApiProduces('text/plain')
  @Header('content-type', 'text/plain')
  @ApiResponse({
    status: 201,
    content: { 'text/plain': { schema: { type: 'string', example: 'http://localhost:3000/{path}/{hash}' } } },
  })
  @ApiResponse({ status: 500 })
  async create(@Body() body: string): Promise<string> {
    return this.linkService.create(body);
  }

  @Get('/:hash')
  @ApiParam({ name: 'hash', schema: { type: 'string', example: 'hash' } })
  @ApiProduces('text/plain')
  @Header('content-type', 'text/plain')
  @ApiResponse({
    status: 200,
    content: { 'text/plain': { schema: { type: 'string', example: 'text' } } },
  })
  @ApiResponse({ status: 404 })
  @ApiResponse({ status: 500 })
  async read(@Param('hash') hash: string): Promise<string> {
    const text = await this.linkService.read(hash);

    if (!text) {
      throw new NotFoundException();
    }

    return text;
  }
}
