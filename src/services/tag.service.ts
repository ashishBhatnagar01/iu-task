import Tag from "../models/tag.model";

export const createTag = async (name: string) => {
  const tag = new Tag({
    name: name,
  });
  await tag.save();
  return tag;
};

export const listAllTags = async () => {
  return await Tag.find();
};
