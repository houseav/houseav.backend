import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  Query,
  Res,
  Next,
} from '@nestjs/common';
import { HouseService } from './house.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response, NextFunction, query } from 'express';

@ApiBearerAuth('access-token')
@ApiTags('house')
@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiBody({ type: CreateHouseDto })
  create(@Body() createHouseDto: CreateHouseDto) {
    return this.houseService.create(createHouseDto);
  }

  // @ApiQuery({ name: 'wifi' })
  // @ApiQuery({ name: 'furnished' })
  // @ApiQuery({ name: 'searchTerm' })
  @Get('/get')
  async getListingsBySearch(
    // @Query('wifi') wifi: boolean,
    // @Query('furnished') furnished: boolean,
    // @Query('searchTerm') searchTerm: string,
    @Query() query: any,
    // @Res() res: Response,
    // @Next() next: NextFunction,
  ) {
    try {
      // const query = { wifi, furnished, searchTerm };
      const listings = await this.houseService.getHousesBySearch(query);
      return listings;
      // if (!listings.length) {
      //   // return next({ statusCode: 404, message: 'Listings not found!' });
      // }
      // return res.status(200).json(listings);
    } catch (error) {
      console.error('Error while searching listing:' + error);
    }
  }

  @Get()
  findAll() {
    return this.houseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.houseService.findOne(+id);
  }

  @Get('user/:id')
  async findUserHouses(@Param('id') id: string) {
    return await this.houseService.findUserHouses(+id);
  }

  @Get('user/:id/:idHouse')
  async findOneByUser(
    @Param('id') id: string,
    @Param('idHouse') idHouse: string,
  ) {
    const house = await this.houseService.findOneByUser(+id, +idHouse);
    if (!house) {
      return 'House not found for this user!';
    }
    return house;
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  @ApiBody({ type: UpdateHouseDto })
  update(@Param('id') id: string, @Body() updateHouseDto: UpdateHouseDto) {
    return this.houseService.update(+id, updateHouseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.houseService.remove(+id);
  }
}
