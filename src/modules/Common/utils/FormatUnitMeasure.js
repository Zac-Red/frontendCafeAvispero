import { FormatDate } from "../../../Utils/FormatElements";

export const formatUnitMeasure = (item) => {
  const { createdAt, updatedAt, deleted, ...restdata } = item;
  let newcreatedAt = FormatDate(createdAt);
  let newupdatedAt = FormatDate(updatedAt);
  let estado = FormatDeleteFlagUnitMeasure(deleted);
  return {
    ...restdata,
    newcreatedAt,
    newupdatedAt,
    estado
  }
}

const FormatDeleteFlagUnitMeasure = (DeleteFlag) => {
  let newFormatDeleteFlag;
  DeleteFlag === true ?
  newFormatDeleteFlag = "Eliminado" 
  : 
  newFormatDeleteFlag = "Activo"
  return newFormatDeleteFlag;
}


export const formatUnitMeasureForSelect = (res) => {
  let unitmeasure = [];
  if (res.items === undefined) {
    return [];
  } else {
    unitmeasure = res.items.map((item)=>(
      {
        value: item.id,
        label: item.name
      }
    ))
  }
  return unitmeasure;
}