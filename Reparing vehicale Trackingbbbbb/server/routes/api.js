var express = require("express");
var apiRouter = express.Router();

//import models
var carInfo = require("../models/carInfo.js");

//import middleware
var userEmpRouter = require("../middleware/mW1/userEmpMiddle.js");
var employeePriv = require("../middleware/mW1/employeePriv.js");
var userClientRouter = require("../middleware/mW2/userClientMiddle.js");
var clientPriv = require("../middleware/mW2/clientPriv.js");

apiRouter.use(userEmpRouter);
apiRouter.use(userClientRouter);


apiRouter.get("/", function (req, res) {
    if (req.body.privilage == "employee") {
        carInfo.find({}, function (err, data) {
            if (err) {
                res.status(500).send({
                    "message": "Err",
                    err: err
                });
            } else {
                res.status(200).send({
                    "message": "Here is the data of all customers' car",
                    data: data
                });
            }
        });
    } else {
        carInfo.find({
            owner: req.body.username
        }, function (err, data) {
            if (err) {
                res.status(500).send({
                    "message": "Err",
                    err: err
                });
            } else {
                res.status(200).send({
                    "message": "Here is the data of " + req.body.username,
                    data: data
                });
            }
        });
    }
});


apiRouter.use(employeePriv);

apiRouter.post("/", function (req, res) {
    var newCarToRepaire = new carInfo(req.body);
    newCarToRepaire.save(function (err, data) {
        if (err) {
            res.status(500).send({
                "message": "Err",
                err: err
            });
        } else {
            res.status(200).send({
                "message": "Data of car has been inserted",
                data: data
            });
        }
    })
});

//apiRouter.put("/:id", function(req, res) {
//    carInfo.findByIdAndUpdate({_id:req.params.id}, req.body, {new: "new"}, function(err, data) {
//        if(err){
//			res.status(500).send({message:"error internal "});
//		} else {
//            console.log(req.body);
//            res.status(200).send({message:"success"});
//        }
//    })
//});

apiRouter.post("/:id", function (req, res) {
    carInfo.findOne({
        _id: req.params.id
    }, function (err, data) {
        if (err) {
            res.status(500).send({
                message: "error internal "
            });
        } else if (data == undefined) {
            res.status(404).send({
                message: "No such item with this id"
            });
        } else {
            //                var repairs = {
            //			description: req.body.description ,
            //            date: req.body.date ,
            //            cost: req.body.cost
            //		}
            console.log(req.body);
            //            console.log(req.body.repairing);
            data.repairing.push(req.body);
            data.save(function (err, data) {
                if (err) {
                    res.status(405).send({
                        message: "error "
                    });
                } else {
                    res.status(200).send({
                        message: "success"
                    });
                };
            });
        };
    });
});

apiRouter.put("/:id", function (req, res) {
    carInfo.findOne({
        "_id": req.params.id
    }, function (err, data) {
        if (err) {
            res.status(500).send({
                "message": "Err",
                err: err
            });
        } else {
            for (key in req.query) {
                if (key === "repairing") {
                    continue;
                } else {
                    data[key] = req.query[key];
                }
                //          if (data[key] == "repairing"){
                //              var repairs=data[key]; 
                //              for (var i =0 ;i<repairs.length ; i++){
                //                  repairs[i].description = req.query[key][i].description
                //                 ,repairs[i].date = req.query[key][i].date
                //                 ,repairs[i].cost = req.query[key][i].cost
                //                 ,repairs[i].username = req.query[key][i].username
                //                 ,repairs[i].privilage = req.query[key][i].privilage 
                //              }
                //          }

            }
            data.save(function (err, data) {
                if (err) {
                    res.status(500).send({
                        "message": "Err",
                        err: err
                    });
                } else {
                    res.status(200).send({
                        "message": "Data of car has been updated",
                        data: data
                    });
                }
            })
        }
    })
});



apiRouter.delete("/:id", function (req, res) {
    carInfo.findOne({
        "_id": req.params.id
    }, function (err, data) {
        if (err) {
            res.status(500).send({
                "message": "Err",
                err: err
            });
        } else {
            data.remove(function (err, data) {
                if (err) {
                    res.status(500).send({
                        "message": "Err",
                        err: err
                    });
                } else {
                    res.status(200).send({
                        "message": "Data of car has been deleted",
                        data: data
                    });
                }
            });
        }
    })
});

module.exports = apiRouter;
