import { FormatDate } from "../../../Utils/FormatElements";

export const formatInventoryMove = (item) => {
  const { createdAt, updatedAt, ...restData } = item;
  const newCreatedAt = FormatDate(createdAt);
  const newUpdatedAt = FormatDate(updatedAt);
  return{
    newCreatedAt,
    newUpdatedAt,
    ...restData
  }
}