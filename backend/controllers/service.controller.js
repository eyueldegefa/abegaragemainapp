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
async function getServiceById(req, res) {
  try {
    const service = await Services.getServiceById(req.params.id);

    if (!service) {
      return res.status(404).json({ 
        status: "Fail",
        message: "Service not found" 
      });
    } else {
      return res.status(200).json({
        status: "Success",
        data: service
      })
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
async function editService(req, res) {

  const { id } = req.params;
  const { 
    service_name, 
    service_description
  } = req.body;

  try {

    const updateService = await Services.editService({
        service_name,
        service_description,
        service_id: id
    });
    
    if (!updateService) {
      return res.status(400).json({
        status: "failure",
        message: "Service not updated"
      });
    }
      return res.status(200).json({
        status: "success",
        message: "Service updated successfully"
      });
      
  } catch (error) {
    console.error("Error on updating service:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}
// To delete a service by ID
async function deleteServiceById(req, res) {
  try {
    const result = await Services.deleteServiceById(req.params.id);

    if (!result || result.affectedRows === 0) {
      // 404 when nothing deleted
      return res.status(404).json({
        status: "Fail",
        message: "Service not found or could not be deleted",
        affectedRows: result ? result.affectedRows : 0
      });
    }

    // success (200) — include a predictable JSON shape
    return res.status(200).json({
      status: "Success",
      message: "Service deleted successfully!",
      affectedRows: result.affectedRows
    });

  } catch (err) {
    // Log server-side error for debugging
    console.error("Error in deleteServiceById controller:", err);

    return res.status(500).json({
      status: "Error",
      message: err.message || "Internal server error"
    });
  }
}
// export the functions
module.exports = {
    getAllServices,
    addNewService,
    getServiceById,
    editService,
    deleteServiceById
}