"use strict";
const bcrypt = require("bcrypt");
// const gensaltedpd = async () => {
//   const bcryptedPassword = await bcrypt.hash("testuserpassword", 10);
//   return bcryptedPassword;
// };
module.exports = {
  // bcp: await gensaltedpd(),
  async up(queryInterface, Sequelize) {
    const bcryptedPassword = await bcrypt.hash("testuserpassword", 10);
    await queryInterface.bulkInsert("users", [
      {
        name: "Seeded Admin",
        password: bcryptedPassword,
        profile_pic: "/null.jpg",
        email: "seedadmin@gmail.com",
        phone_no: 9878908978,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
};
