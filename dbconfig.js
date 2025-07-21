const { Sequelize } = require("sequelize");
const { readFile } = require("fs/promises");

const path = require("path");
 const sequelize = new Sequelize('TestDatabase','postgres','MyGSTCafe@9088',{
  host: "localhost",
  dialect: "postgres",
  logging: false,
 });


//   client.query(
//     `CREATE TABLE "SignedInvoices" (
// 	"ACKNo" varchar(50) NOT NULL,
// 	"SignedInvoice" text NOT NULL
// )`, (err, result) => {
//     if (err) {
//       console.error("Error executing query", err);
//     } else {
//       console.log("Query result:", result.rows);
//     }
//   });
const executeQuery = async ()=>{
try{
  await sequelize.authenticate();
  console.log("Connected to PostgreSQL via Sequelize");
  const filePath =path.join(__dirname,"createCompany.sql");
  const query = await readFile(filePath,'utf-8');
  await sequelize.query(query);
}
catch(e){
  throw e;
}
finally{
  await sequelize.close();
}
};


executeQuery().then(()=>console.log("query Excuted")).catch((e)=>console.log(e));
  module.exports=sequelize;