const fs = require('fs');
const CategoryDB = require('../models/category');
const UserDB = require('../models/user');
const ChildCatDB = require('../models/childcat');
const OrderDB = require('../models/order');
const OrderItemsDB = require('../models/orderItem');
const PermitDB = require('../models/permit');
const ProductDB = require('../models/product');
const RoleDB = require('../models/role');
const SubcatDB = require('../models/subcat');


const storage = (file) => "./migrations/backups/" + file + ".json";

const migrator = {
   backup : async (DB,file) =>{
      let data = await DB.find();
      await writeFile(storage(file),data);
      console.log(file, " Backup Done! ")
   },
   restore : async (DB,file) => {
      let data = await readFile(storage(file));
      await DB.insertMany(data);
      console.log(file , " Migrated!");
   }
}

let backup = async () => {
   await migrator.backup(UserDB,'user');
   await migrator.backup(CategoryDB,'category');
   await migrator.backup(ChildCatDB,'childcat');
   await migrator.backup(OrderDB,'order');
   await migrator.backup(OrderItemsDB,'orderItem');
   await migrator.backup(PermitDB,'permit');
   await migrator.backup(ProductDB,'product');
   await migrator.backup(RoleDB,'role');
   await migrator.backup(SubcatDB,'subcat');
}
let migrate = async () => {
   await migrator.restore(UserDB,'user');
   await migrator.restore(CategoryDB,'category');
   await migrator.restore(ChildCatDB,'childcat');
   await migrator.restore(OrderDB,'order');
   await migrator.restore(OrderItemsDB,'orderItem');
   await migrator.restore(PermitDB,'permit');
   await migrator.restore(ProductDB,'product');
   await migrator.restore(RoleDB,'role');
   await migrator.restore(SubcatDB,'subcat');
}

const writeFile = async(file,data) => await fs.writeFileSync(file,JSON.stringify(data), 'utf8');
const readFile = async (file) => JSON.parse(await fs.readFileSync(file,"utf8"));


module.exports = {
   backup,
   migrate
}