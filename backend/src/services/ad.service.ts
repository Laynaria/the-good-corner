import { Ad } from "../entities/ad";
import { Category } from "../entities/category";
import { Tag } from "../entities/tag";

export const findAll = () => {};

export const findById = (id: number): Promise<Ad | null> => {
  return Ad.findOne({
    relations: {
      category: true,
      tags: true,
    },
    where: { id: id },
  });
};

// interface createBody extends Ad {
//   category_id: number;
// }

export const create = async (body: any) => {
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

export const modify = async (body: any, id: number) => {
  const ad = await Ad.findOneBy({ id });

  if (ad) {
    ad.title = body.title;
    ad.description = body.description;
    ad.owner = body.owner;
    ad.price = body.price;
    ad.picture = body.picture;
    ad.location = body.location;

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

    ad.save();

    return ad;
  }
};
