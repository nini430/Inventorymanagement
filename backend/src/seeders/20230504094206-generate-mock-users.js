'use strict';
const fs=require('fs');
const path=require('path')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('inventories',JSON.parse(fs.readFileSync(path.join(__dirname,'..','..','_data','users_data.json')))  , {});

  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('inventories', null, {});
  }
};
