import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';
import { Banner } from './entities/banner.entity';

@ApiTags('banner')
@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiBody({ type: CreateBannerDto })
  create(@Body() createBannerDto: CreateBannerDto): Promise<string> {
    return this.bannerService.create(createBannerDto);
  }

  @Get()
  findAll(): Promise<Banner[]> {
    return this.bannerService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id param to get the banner',
    type: 'integer',
  })
  findOne(@Param('id') id: string): Promise<Banner> {
    return this.bannerService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id param to update the banner',
    type: 'integer',
  })
  @ApiBody({ type: UpdateBannerDto })
  update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto) {
    return this.bannerService.update(+id, updateBannerDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id param to delete the church',
    type: 'integer',
  })
  remove(@Param('id') id: string): Promise<string> {
    return this.bannerService.delete(+id);
  }
}
