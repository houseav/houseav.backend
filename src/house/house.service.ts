import { Injectable } from '@nestjs/common';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { House } from './entities/house.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { QueueHouseRegistration } from 'src/queue-house-registration/entities/queue-house-registration.entity';
import { HouseResponse } from './dto/house-response';

@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(House)
    private houseRepository: Repository<House>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(QueueHouseRegistration)
    private queueHouseRegistrationRepository: Repository<QueueHouseRegistration>,
  ) {}

  async create(createHouseDto: CreateHouseDto): Promise<any> {
    try {
      const house = await this.checkUserGetHouse(createHouseDto, true, null);
      const houseSaved = await this.houseRepository.save(house);
      const queueHouse = new QueueHouseRegistration();
      queueHouse.fkHouseId = houseSaved;
      queueHouse.verified = false;
      const houseQueueSaved =
        await this.queueHouseRegistrationRepository.save(queueHouse);
      if (houseQueueSaved) {
        houseSaved.fkQueueHouseRegistrationId = houseQueueSaved;
        await this.houseRepository.update(houseSaved.id, houseSaved);
        return { message: 'House added with success' };
      } else {
        return { message: 'Error while adding house' };
      }
    } catch (error) {
      console.error('Error while adding house: ' + error);
      return { message: 'Error while adding house: ' + error.message };
    }
  }

  async findAll(): Promise<House[]> {
    return await this.houseRepository.find({
      relations: {
        fkUserId: true,
        fkQueueHouseRegistrationId: true,
      },
      where: {
        fkQueueHouseRegistrationId: {
          verified: true,
        },
      },
    });
  }

  async findOneWithPassword(id: number): Promise<House | any> {
    const house = await this.houseRepository.findOne({
      where: { id },
      relations: { fkUserId: true, fkQueueHouseRegistrationId: true },
    });
    if (house.fkQueueHouseRegistrationId.verified === false) {
      return { verified: false, message: 'House not verified yet' };
    } else {
      return house;
    }
  }

  async findOne(id: number): Promise<House | any> {
    const house = await this.houseRepository.findOne({
      where: { id },
      relations: { fkUserId: true, fkQueueHouseRegistrationId: true },
    });

    if (!house) {
      throw new Error('House not found');
    }

    if (house.fkQueueHouseRegistrationId.verified === false) {
      return { verified: false, message: 'House not verified yet' };
    } else {
      // Deep clone the house object to avoid mutating the original data
      const clonedHouse = JSON.parse(JSON.stringify(house));

      if (clonedHouse.fkUserId) {
        delete clonedHouse.fkUserId.password;
      }

      return clonedHouse;
    }
  }

  async findUserHouses(id: number): Promise<House[]> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id },
        relations: { fkHouseId: { fkQueueHouseRegistrationId: true } },
      });
      if (!user) throw new Error('User not found');
      return user.fkHouseId;
    } catch (error) {
      console.error('Error while findByUser: ' + error);
    }
  }

  async findOneByUser(userId: number, idHouse: number): Promise<House | any> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: { fkHouseId: true },
      });

      if (!user) throw new Error('User not found');

      // Filter the user's houses to find the one with the matching idHouse
      const houseFounded = user.fkHouseId.find((house) => house.id === idHouse);

      if (houseFounded.fkQueueHouseRegistrationId.verified == false) {
        return { verified: false, message: 'House not verified yet' };
      }

      if (!houseFounded) {
        throw new Error('House not found for this user!');
      }

      return houseFounded;
    } catch (error) {
      console.error('Error while findByUser: ' + error);
    }
  }

  async findOneByUserTkn(idHouse: number): Promise<House | any> {
    try {
      console.log('House');
      // Filter the user's houses to find the one with the matching idHouse
      // const houseFounded = user.fkHouseId.find((house) => house.id === idHouse);

      // if (houseFounded.fkQueueHouseRegistrationId.verified == false) {
      //   return { verified: false, message: 'House not verified yet' };
      // }

      // if (!houseFounded) {
      //   throw new Error('House not found for this user!');
      // }

      // return houseFounded;
    } catch (error) {
      console.error('Error while findByUser: ' + error);
    }
  }

  async update(
    id: number,
    updateHouseDto: UpdateHouseDto,
  ): Promise<HouseResponse> {
    try {
      let house = await this.checkUserGetHouse(updateHouseDto, false, id);
      if (house.fkQueueHouseRegistrationId) {
        house = await this.houseRepository.update(id, house);
        return { message: `House updated with success` };
      } else {
        return { message: `Error while updating house` };
      }
    } catch (error) {
      console.error('Error while updating house: ' + error);
      return { message: `Error while updating house`};
    }
  }

  async remove(id: number) {
    const house = this.houseRepository.findOne({ where: { id } });
    if (!house) {
      throw new Error('House not found');
    }
    // const

    await this.houseRepository.delete(id);
    return `House remove with success`;
  }

  async getHousesBySearch(query: any): Promise<House[]> {
    const queryBuilder = this.houseRepository.createQueryBuilder('house');
    queryBuilder.innerJoinAndSelect(
      'house.fkQueueHouseRegistrationId',
      'queueHouseRegistration',
    );

    queryBuilder.where('queueHouseRegistration.verified = :verified', {
      verified: true,
    });

    const searchTerm = query.searchTerm || '';
    if (searchTerm.trim() !== '') {
      queryBuilder.where('house.title ILIKE :searchTerm', {
        searchTerm: `%${searchTerm}%`,
      });
    }

    if (query.wifi !== null && query.wifi !== undefined) {
      const wifi = query.wifi !== 'false';
      queryBuilder.andWhere('house.wifi = :wifi', { wifi });
    }
    if (query.furnished !== null && query.furnished !== undefined) {
      const furnished = query.furnished !== 'false';
      queryBuilder.andWhere('house.furnished = :furnished', { furnished });
    }
    if (query.parking !== null && query.parking !== undefined) {
      const parking =
        query.parking !== 'false' || query.parking == undefined ? false : true;
      queryBuilder.andWhere('house.parking = :parking', { parking });
    }

    if (query.availability !== null && query.availability !== undefined) {
      const availability = query.availability !== 'false';
      queryBuilder.andWhere('house.availability = :availability', {
        availability,
      });
    }

    //Search TODO
    // const type = query.type || 'Residential';
    // if (type) {
    //   queryBuilder.andWhere('house.type = :type', { type });
    // }

    // const animali = query.animali !== 'false' || query.animali == undefined ? false : true;
    // if (animali) queryBuilder.andWhere('house.animali is not null');

    const allergy =
      query.allergy == undefined
        ? false
        : query.allergy !== 'false'
          ? true
          : false;
    if (allergy) queryBuilder.andWhere('house.allergy is not null');

    const limit = parseInt(query.limit) || 9;
    const sort = query.sort || 'createdAt';
    const order = query.order === 'asc' ? 'ASC' : 'DESC';

    const startIndex = parseInt(query.startIndex) || 0;
    queryBuilder.orderBy(`house.${sort}`, order);
    queryBuilder.skip(startIndex);
    queryBuilder.take(limit);

    return await queryBuilder.getMany();
  }

  async checkUserGetHouse(houseDto, isCreating, idHouse: number): Promise<any> {
    const {
      title,
      description,
      address,
      zipcode,
      streetNumber,
      city,
      state,
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
      updatedAt,
      userId,
    } = houseDto;

    let { queueHouseId } = houseDto;

    const user = await this.userRepository.findOne({
      where: { id: +userId },
    });

    if (!user && !isCreating) {
      throw new Error('User not found');
    }

    if (!queueHouseId && idHouse) {
      const houseInDb = await this.houseRepository.findOne({
        where: { id: +idHouse },
        relations: { fkQueueHouseRegistrationId: true },
      });

      if (houseInDb) {
        queueHouseId = houseInDb.fkQueueHouseRegistrationId.id;
      } else {
        throw new Error('Error finding QueuHouseRegistration');
      }
    }

    let house = null;
    let houseQueue = null;
    if (!isCreating) {
      houseQueue = await this.queueHouseRegistrationRepository.findOne({
        where: { id: +queueHouseId },
      });

      if (!houseQueue) {
        throw new Error('Queue house not found');
      }
    }

    house = {
      title: title,
      description: description,
      address: address,
      zipcode: zipcode,
      streetNumber: streetNumber,
      city: city,
      state: state,
      bathrooms: bathrooms,
      bedrooms: bedrooms,
      furnished: furnished,
      parking: parking,
      type: type,
      wifi: wifi,
      imageUrls: imageUrls,
      availability: availability,
      availabilityDateStart: availabilityDateStart,
      availabilityDateEnd: availabilityDateEnd,
      sleepPlace: sleepPlace,
      allergy: allergy,
      animali: animali,
      requestRoommateType: requestRoommateType,
      transportation: transportation,
      zone: zone,
      createdAt: createdAt,
      updatedAt: updatedAt,
      fkUserId: user,
      fkQueueHouseRegistrationId: houseQueue,
    };
    return house;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function interpolateParamsToCheckQueryMadeByQueryBuilder(queryBuilder) {
  let sql = queryBuilder.getSql();
  const bindings = queryBuilder.getParameters();

  const numberOfProperties = Object.keys(bindings);
  for (let i = 0; i < numberOfProperties.length; i++) {
    const value = bindings[numberOfProperties[i]];
    sql = sql.replace(`$${i}`, `'${value}'`);
  }
  console.log('Query made by QueryBuilder: ', sql);
}
