// import services.service
const Services = require('../services/service.service');
// a function to get all services
async function getAllServices(req, res, next) {
    try {
        const services = await Services.getAllServices();
        if(!services){
            return res.status(500).json({
                status: "Fail",
                message: "Could not fetch services"
            })
        } else{
            return res.status(200).json({
                status: "Success",
                data: services
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(501).json({
            status: "Fail",
            message: "server error"
        })
    }
    
}
// a function to control add new service
async function addNewService(req, res) {
    try {
        const serviceData = req.body;
        const service = await Services.addNewService(serviceData);
        if(!service){
            return res.status(400).json({
                status: "Fail",
                message: "Service could not be added"
            })
        } else {
            return res.status(200).json({
                status: "Success",
                message: "Service added successfully"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "Fail",
            message: "Server error"
        })
        
    }
    
}
// export the functions
module.exports = {
    getAllServices,
    addNewService
}