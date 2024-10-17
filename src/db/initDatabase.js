import {Sequelize} from "@sequelize/core";
import {MySqlDialect} from "@sequelize/mysql";

class ConnectDatabase {
   // Khởi tạo kết nối với database
   constructor(database) {
      const {host, port, username, password, dbName, dialect} = database;
      this.connection = new Sequelize(dbName, username, password, {
         host: host || "localhost",
         port: port || 3306,
         dialect: dialect || MySqlDialect,
         logging: false,
      });
   }

   // Lấy unique identifier của database
   static getDatabaseUniqueIdentifier(database) {
      return Buffer.from(JSON.stringify(database)).toString("base64");
   }

   // Lấy instance của ConnectDatabase
   static getInstance(database = {}) {
      if (!this.instance) {
         this.instance = {};
      }
      const _id = ConnectDatabase.getDatabaseUniqueIdentifier(database);
      if (!this.instance[_id]) {
         this.instance[_id] = new ConnectDatabase(database);
      }
      return this.instance[_id];
   }

   // Đóng kết nối với database
   static closeDatabase(database) {
      const _id = ConnectDatabase.getDatabaseUniqueIdentifier(database);
      if (this.instance[_id]) {
         this.instance[_id].connection.close();
         delete this.instance[_id];
      }
   }

   // Đồng bộ model với database
   syncModels() {
      return this.connection.sync();
   }

   // Kiểm tra kết nối với database
   async authenticate() {
      return await this.connection.authenticate();
   }
}

module.exports = ConnectDatabase;
