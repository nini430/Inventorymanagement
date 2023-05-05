'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('inventories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      uuid:{
        type:Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4
      },
      name_ka: {
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
          notEmpty:{msg:'name_required'},
          notNull:{msg:'name_required'}
        }
      },
      name_en: {
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
          notEmpty:{msg:'name_required'},
          notNull:{msg:'name_required'}
        }
      },
      price:{
        type:Sequelize.FLOAT,
        allowNull:false,
        validate:{
          notEmpty:{msg:'price_required'},
          notNull:{msg:'price_required'}
        },
      },
      location:{
        type:Sequelize.ENUM({values:['cavea_tbilisi_mall','cavea_city_mall','cavea_east_point','main_office','cavea_gallery']}),
        allowNull:false,
        validate:{
          notEmpty:{msg:'location_required'},
          notNull:{msg:'location_required'},
          notIn:{args:[['cavea_tbilisi_mall','cavea_city_mall','cavea_east_point','main_office','cavea_gallery']],msg:'location_should_be_one_of_them'}
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('inventories');
  }
};