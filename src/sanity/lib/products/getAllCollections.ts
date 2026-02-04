import { defineQuery } from "next-sanity";
import { sanityFetchStatic } from "../sanityFetchStatic";

export const getAllCollections = async () => {
  const ALL_COLLECTIONS = defineQuery(
    `*[_type== "collection"] | order(title desc){
      _id,
      _type,
      _createdAt,
      updatedAt,
      
      title,
      "slug": slug.current
    }`,
  );

  try {
    const collections = await sanityFetchStatic({
      query: ALL_COLLECTIONS,
    });
    return collections || [];
  } catch (error) {
    console.error("Error fetching all collections", error);
    return [];
  }
};
