'use strict';
/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require('sequelize');
module.exports = {
  async up(queryInterface: any, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('inventories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'name_required' },
          notNull: { msg: 'name_required' },
        },
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'price_required' },
          notNull: { msg: 'price_required' },
        },
      },
      location: {
        type: Sequelize.ENUM({
          values: [
            'cavea_tbilisi_mall',
            'cavea_city_mall',
            'cavea_east_point',
            'main_office',
            'cavea_gallery',
          ],
        }),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'location_required' },
          notNull: { msg: 'location_required' },
          notIn: {
            args: [
              [
                'cavea_tbilisi_mall',
                'cavea_city_mall',
                'cavea_east_point',
                'main_office',
                'cavea_gallery',
              ],
            ],
            msg: 'location_should_be_one_of_them',
          },
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface: any, Sequelize: any) {
    await queryInterface.dropTable('inventories');
  },
};
