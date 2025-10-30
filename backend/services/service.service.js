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
// export the functions
module.exports = {
    getAllServices,
    addNewService
}