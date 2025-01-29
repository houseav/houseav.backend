import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { QueueHouseRegistration } from 'src/queue-house-registration/entities/queue-house-registration.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateHouseDto {
  @ApiProperty({ example: `titlel` })
  @IsString({ message: 'Title must be a string', always: true })
  @IsNotEmpty({
    message: 'Title must be validated',
    always: true,
  })
  title: string;

  @ApiProperty({ example: `description` })
  @IsString({ message: 'Description must be a string', always: true })
  @IsNotEmpty({
    message: 'Description must be validated',
    always: true,
  })
  description: string;

  @ApiProperty({ example: `address` })
  @IsString({ message: 'Address must be a string', always: true })
  @IsNotEmpty({
    message: 'Address must be validated',
    always: true,
  })
  address: string;

  @ApiProperty({ example: `zipcode` })
  @IsNotEmpty({
    message: 'Zipcode must be validated',
    always: true,
  })
  zipcode: string | number;

  @ApiProperty({ example: `streetNumber` })
  @IsNotEmpty({
    message: 'StreetNumber must be validated',
    always: true,
  })
  streetNumber: string | number;

  @ApiProperty({ example: `city` })
  @IsString({ message: 'City must be a string', always: true })
  @IsNotEmpty({
    message: 'City must be validated',
    always: true,
  })
  city: string;

  @ApiProperty({ example: `state` })
  @IsString({ message: 'State must be a string', always: true })
  @IsNotEmpty({
    message: 'State must be validated',
    always: true,
  })
  state: string;

  @ApiProperty({ example: 2 })
  @IsNumber({ allowNaN: false })
  @IsNotEmpty({
    message: 'Bathroom must be validated',
    always: true,
  })
  bathrooms: number;

  @ApiProperty({ example: 5 })
  @IsNumber({ allowNaN: false })
  @IsNotEmpty({
    message: 'Bedroom must be validated',
    always: true,
  })
  bedrooms: number;

  @ApiProperty({ example: `true` })
  @IsBoolean({ message: 'furnished must be a boolean', always: true })
  @IsNotEmpty({
    message: 'Furnished must be validated',
    always: true,
  })
  furnished?: boolean;

  @ApiProperty({ example: `true` })
  @IsBoolean({ message: 'Parking must be a boolean', always: true })
  parking?: boolean;

  @ApiProperty({ example: `type's house` })
  @IsString({ message: 'Type must be a string', always: true })
  type?: string; //villa, appartamento..

  @ApiProperty({ example: `true` })
  @IsBoolean({ message: 'Wifi must be a boolean', always: true })
  wifi: boolean;

  @ApiProperty({ example: `https://github.com/lucaimbalzano/houseav` })
  @IsString({ message: 'Image Urls must be a string', always: true })
  imageUrls: string;

  @ApiProperty({ example: `true` })
  @IsBoolean({ message: 'availability must be a boolean', always: true })
  availability: boolean;

  @ApiProperty({ example: `2020-03-04` })
  availabilityDateStart?: Date;

  @ApiProperty({ example: `2020-03-04` })
  availabilityDateEnd?: Date;

  @ApiProperty({ example: 10 })
  sleepPlace?: number;

  @ApiProperty({ example: `allergy` })
  @IsString({ message: 'allergy must be a string', always: true })
  allergy: string;

  @ApiProperty({ example: `Animali` })
  animals: string;

  @ApiProperty({ example: `coppie; famiglie; bambini` })
  requestRoommateType: string; // coppie; famiglie; bambini

  @ApiProperty({ example: `auto atm` })
  transportation: string; // if need autotransportation: auto; atm

  @ApiProperty({ example: `Via Monte Napoleone 1, Milano` })
  zone: string; // zona

  @ApiProperty({ example: `2020-03-03` })
  createdAt?: Date;

  @ApiProperty({ example: `2020-03-04` })
  updatedAt?: Date;

  @ApiProperty({ example: `1` })
  userId: number | User;

  @ApiProperty({ example: `1` })
  queueHouseId: number | QueueHouseRegistration;

  @ApiProperty({ example: `false` })
  @IsBoolean()
  verified?: boolean | null;

  @ApiProperty({ example: `9.112047290691110` })
  longitude?: string;

  @ApiProperty({ example: `45.49220310174620` })
  latitude?: string;
}
