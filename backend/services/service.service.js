// import db.config
const conn = require('../config/db.config');
// create a function to get the services
async function getAllServices() {
    const query = "SELECT * FROM common_services";
    const rows = await conn.query(query);
    return rows;
}
// a function to add new service
async function addNewService(service) {
    let addedService = {};
    try {
    const query = "INSERT INTO common_services (service_name, service_description) VALUES (?, ?)";
    const rows = await conn.query(query, [service.service_name, service.service_description]);

    if(rows.affectedRows !== 1) {
        return false;
    }
    const service_id = rows.insertId;
    addedService = {
        service_id : service_id
    }
    } catch(err){
        console.log(err);
    }
    return addedService;
}
// get service by id
async function getServiceById(service_id) {
  const query = "SELECT * FROM common_services WHERE service_id = ?";
  const rows = await conn.query(query, [service_id]);
    if (rows.length === 0) return null;
  return rows[0];  // ✅ only return one service
}
// A function to Edit or Update service
async function editService({
    service_name,
    service_description,
    service_id
}) {
  const query = `UPDATE common_services SET service_name = ?, service_description = ? WHERE service_id = ?`;

  const rows = await conn.query(query, [
    service_name,
    service_description,
    service_id
  ]);

  return rows;
}
// delete service by id
async function deleteServiceById(service_id) {
  const query = "DELETE FROM common_services WHERE service_id = ?";
  const rows = await conn.query(query, [service_id]);
  return rows;
}
// export the functions
module.exports = {
    getAllServices,
    addNewService,
    getServiceById,
    editService,
    deleteServiceById
}