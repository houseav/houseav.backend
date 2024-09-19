import { Injectable } from '@nestjs/common';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { CreateBannerDto } from './dto/create-banner.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Banner } from './entities/banner.entity';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private bannerRepository: Repository<Banner>,
  ) {}

  async create(createBannerDto: CreateBannerDto): Promise<string> {
    const { motivation } = createBannerDto;
    const banner: Banner = { motivation };
    try {
      await this.bannerRepository.save(banner);
      return 'Banner to user x added with success';
    } catch (e) {
      return 'Error while creating a banner: ' + e;
    }
  }

  findAll(): Promise<Banner[]> {
    return this.bannerRepository.find();
  }

  findOne(id: number): Promise<Banner> {
    return this.bannerRepository.findOne({ where: { id } });
  }

  async update(id: number, updateBannerDto: UpdateBannerDto): Promise<string> {
    await this.bannerRepository.update(id, updateBannerDto);
    return `Update banner with success`;
  }

  async delete(id: number): Promise<string> {
    await this.bannerRepository.delete(id);
    return `Banner deleted with success`;
  }
}
