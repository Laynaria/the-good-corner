import { DeleteResult, Like } from "typeorm";
import { Ad } from "../entities/ad";
import { Category } from "../entities/category";
import { Tag } from "../entities/tag";

export const findAll = async (
  categoryId: number,
  tagName: string = "",
  terms: string = ""
): Promise<Ad[]> => {
  let ad: Ad[];

  if (tagName && categoryId) {
    ad = await Ad.find({
      relations: {
        category: true,
        tags: true,
      },
      where: {
        tags: { name: tagName },
        category: {
          id: categoryId,
        },
        title: Like(`%${terms}%`),
      },
    });
    return ad;
  }

  if (tagName) {
    ad = await Ad.find({
      relations: {
        tags: true,
      },
      where: {
        tags: { name: tagName },
        title: Like(`%${terms}%`),
      },
    });
    return ad;
  }

  if (categoryId) {
    ad = await Ad.find({
      relations: {
        category: true,
      },
      where: {
        category: {
          id: categoryId,
        },
        title: Like(`%${terms}%`),
      },
    });
    return ad;
  }

  ad = await Ad.find({
    relations: {
      category: true,
      tags: true,
    },
    where: { title: Like(`%${terms}%`) },
  });

  return ad;
};

export const findById = (id: number): Promise<Ad | null> => {
  return Ad.findOne({
    relations: {
      category: true,
      tags: true,
    },
    where: { id: id },
  });
};

// trying to create a type instead of any
// interface createBody extends Ad {
//   category_id: number;
// }

export const create = async (body: any): Promise<Ad> => {
  const ad = new Ad();
  ad.title = body.title;
  ad.description = body.description;
  ad.owner = body.owner;
  ad.price = body.price;
  ad.picture = body.picture;
  ad.location = body.location;
  ad.createdAt = new Date();

  const category = await Category.findOneBy({ id: body.category_id });

  if (category) {
    ad.category = category;
  }

  const tagsName = body.tags;
  if (tagsName && tagsName.length > 0) {
    const tagsEntities: Tag[] = [];

    for (const tagName of tagsName) {
      let tag = await Tag.findOneBy({ name: tagName });

      if (!tag) {
        tag = new Tag();
        tag.name = tagName;
      }

      tagsEntities.push(tag);
    }

    ad.tags = tagsEntities;
  }

  return ad.save();
};

export const modify = async (
  body: any,
  id: number
): Promise<Ad | undefined> => {
  const ad = await Ad.findOneBy({ id });

  if (ad) {
    ad.title = body.title;
    ad.description = body.description;
    ad.owner = body.owner;
    ad.price = body.price;
    ad.picture = body.picture;
    ad.location = body.location;

    const category = await Category.findOneBy({ id: body.categoryId });

    if (category) {
      ad.category = category;
    }

    const tagsName = body.tags;
    if (tagsName && tagsName.length > 0) {
      const tagsEntities: Tag[] = [];

      for (const tagName of tagsName) {
        let tag = await Tag.findOneBy({ name: tagName });

        if (!tag) {
          tag = new Tag();
          tag.name = tagName;
        }

        tagsEntities.push(tag);
      }

      ad.tags = tagsEntities;
    }

    ad.save();

    return ad;
  }
};

export const deleteAd = (id: number): Promise<DeleteResult> => {
  return Ad.delete({ id: id });
};
