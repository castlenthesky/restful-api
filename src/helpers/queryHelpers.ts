import { loadCollection } from "../loaders/mongodb";

export async function existsInCollection(
  collectionName: string,
  key: string,
  value: string
) {
  let query = {};
  query[key] = value;

  const collection = loadCollection(collectionName);
  const record = await collection.find(query).toArray();
  if (record.length) {
    return true;
  }
  return false;
}
