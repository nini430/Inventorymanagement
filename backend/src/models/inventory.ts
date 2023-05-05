'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
module.exports = (sequelize:any, DataType:typeof DataTypes) => {
  interface InventoryAttributes {
    name_ka:string;
    name_en:string;
    price:number;
    location:string;
    uuid:string;
  }
  class Inventory extends Model<InventoryAttributes> implements InventoryAttributes {
    static associate(models:any) {
    }
    name_en!:string;
    name_ka!:string;
    price!:number;
    location!:string
    uuid!:string;
  }
  Inventory.init({
    uuid:{
      type:DataType.UUID,
      defaultValue:DataType.UUIDV4
    },
    name_ka: {
      type:DataType.STRING,
      allowNull:false,
      validate:{
        notEmpty:{msg:'name_required'},
        notNull:{msg:'name_required'}
      }
    },
    name_en: {
      type:DataType.STRING,
      allowNull:false,
      validate:{
        notEmpty:{msg:'name_required'},
        notNull:{msg:'name_required'}
      }
    },
    price:{
      type:DataType.FLOAT,
      allowNull:false,
      validate:{
        notEmpty:{msg:'price_required'},
        notNull:{msg:'price_required'}
      },
    },
    location:{
      type:DataType.ENUM({values:['cavea_tbilisi_mall','cavea_city_mall','cavea_east_point','main_office','cavea_gallery']}),
      allowNull:false,
      validate:{
        notEmpty:{msg:'location_required'},
        notNull:{msg:'location_required'},
        notIn:{args:[['cavea_tbilisi_mall','cavea_city_mall','cavea_east_point','main_office','cavea_gallery']],msg:'location_should_be_one_of_them'}
      }
    }
  }, {
    sequelize,
    modelName: 'Inventory',
    tableName:'inventories',
  });
  return Inventory;
};