import { Injectable } from '@nestjs/common';
import { CreateQueueHouseRegistrationDto } from './dto/create-queue-house-registration.dto';
import { UpdateQueueHouseRegistrationDto } from './dto/update-queue-house-registration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueueHouseRegistration } from './entities/queue-house-registration.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { HouseService } from 'src/house/house.service';
import { House } from 'src/house/entities/house.entity';

@Injectable()
export class QueueHouseRegistrationService {
  constructor(
    @InjectRepository(QueueHouseRegistration)
    private queueHouseRegistrationRepository: Repository<QueueHouseRegistration>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(House)
    private houseRepository: Repository<House>,
    private houseService: HouseService,
  ) {}

  async create(
    createQueueHouseRegistrationDto: CreateQueueHouseRegistrationDto,
  ) {
    return await this.queueHouseRegistrationRepository.save(
      createQueueHouseRegistrationDto,
    );
  }

  async findAllVerifiedFalse() {
    try {
      const queueHouseRegistration =
        await this.queueHouseRegistrationRepository.find({
          relations: { fkHouseId: { fkUserId: true } },
          where: { verified: false },
        });

      if (queueHouseRegistration && queueHouseRegistration.length > 0) {
        return queueHouseRegistration;
      } else {
        return { status: 404, message: 'No records found!' };
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Error fetching data');
      return { message: 'Error fetching data: ' + error.message };
    }
  }

  async findAll() {
    try {
      const queueHouseRegistration =
        await this.queueHouseRegistrationRepository.find({
          relations: { fkHouseId: { fkUserId: true } },
        });

      if (queueHouseRegistration && queueHouseRegistration.length > 0) {
        return queueHouseRegistration;
      } else {
        return { message: 'No data found!' };
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Error fetching data');
      return { message: 'Error fetching data: ' + error.message };
    }
  }

  async findOne(id: number) {
    return await this.queueHouseRegistrationRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: number,
    updateQueueHouseRegistrationDto: UpdateQueueHouseRegistrationDto,
  ) {
    return await this.queueHouseRegistrationRepository.update(
      id,
      updateQueueHouseRegistrationDto,
    );
  }

  async remove(id: number) {
    return await this.queueHouseRegistrationRepository.delete(id);
  }

  async verify(
    createQueueHouseRegistrationDto: UpdateQueueHouseRegistrationDto,
  ) {
    try {
      if (createQueueHouseRegistrationDto.house.verified === true) {
        return await this.checkHouseAndGetEntity(
          createQueueHouseRegistrationDto,
        );
      } else {
        return { message: 'House not verified' };
      }
    } catch (error) {
      console.error(`Error occured: ${error.message}`);
    }
  }

  async checkHouseAndGetEntity(houseDto): Promise<any> {
    const queueHouseId = houseDto.house.id;
    const queueHouse = new QueueHouseRegistration();
    queueHouse.verified = houseDto.house.verified;
    queueHouse.updatedAt = new Date();
    const queueHouseUpdated =
      await this.queueHouseRegistrationRepository.update(
        +queueHouseId,
        queueHouse,
      );

    if (queueHouseUpdated) {
      const {
        title,
        description,
        address,
        bathrooms,
        bedrooms,
        furnished,
        parking,
        type,
        wifi,
        imageUrls,
        availability,
        availabilityDateStart,
        availabilityDateEnd,
        sleepPlace,
        allergy,
        animali,
        requestRoommateType,
        transportation,
        zone,
        createdAt,
        fkUserId,
        id,
      } = houseDto.house.fkHouseId;
      const houseChecked = new House();
      houseChecked.id = id;
      houseChecked.address = address;
      houseChecked.allergy = allergy;
      houseChecked.availability = availability;
      houseChecked.availabilityDateEnd = availabilityDateEnd;
      houseChecked.availabilityDateStart = availabilityDateStart;
      houseChecked.bathrooms = bathrooms;
      houseChecked.bedrooms = bedrooms;
      houseChecked.createdAt = createdAt;
      houseChecked.description = description;
      houseChecked.fkUserId = fkUserId;
      houseChecked.furnished = furnished;
      houseChecked.imageUrls = imageUrls;
      houseChecked.parking = parking;
      houseChecked.requestRoommateType = requestRoommateType;
      houseChecked.sleepPlace = sleepPlace;
      houseChecked.title = title;
      houseChecked.transportation = transportation;
      houseChecked.type = type;
      houseChecked.wifi = wifi;
      houseChecked.zone = zone;
      houseChecked.animali = animali;
      const houseUpdated = await this.houseRepository.update(
        houseChecked.id,
        houseChecked,
      );
      if (houseUpdated) {
        return { message: 'House updated with success' };
      } else {
        return { message: 'Error occured, house not updated' };
      }
    } else {
      return { message: 'Error occured, house not updated' };
    }
  }
}
