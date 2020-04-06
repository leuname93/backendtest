const ObjectID = require("mongodb").ObjectID;
const db = require("../../db");
require('dotenv').config();

const dbName = process.env.DB_NAME;
const collectionName = "Centroscomerciales";

exports.setMall = async (req, res, next) => {
  db.initialize(dbName, collectionName, dbCollection => {
    const item = req.body;
    dbCollection.insertOne(item, (error, result) => {
      if (error) {
        res.status(500).send({
          data: {
            success: false,
            messagge: error.message
          }
        });
      }
      res.status(201).send({
        data: {
          success: true,
          messagge: "Centro comercial registrado correctamente",
          data: result.ops
        }
      });
    });
  });
};

exports.getMall = async (req, res, next) => {
  db.initialize(dbName, collectionName, dbCollection => {
    dbCollection.find().toArray((error, result) => {
      if (error) {
        res.status(500).send({
          data: {
            success: false,
            messagge: "Database error",
            error: error.message
          }
        });
      }
      res.status(200).send({
        data: {
          success: true,
          messagge: "Listado de todos los centros comerciales",
          data: result
        }
      });
    });
  });
};

exports.updateMall = async (req, res, next) => {
  try {
    if (!req.query.id) {
      res.status(404).send({
        data: {
          success: false,
          messagge: "No se proporciono paramatreo de busqueda"
        }
      });
    }
    db.initialize(dbName, collectionName, dbCollection => {
      const { id } = req.query;
      const { body } = req;
      dbCollection.updateOne(
        { _id: ObjectID(id) },
        { $set: body },
        (error, result) => {
          if (error) {
            res.status(500).send({
              data: {
                success: false,
                messagge: "Database error",
                error: error.message
              }
            });
          }
          dbCollection.find().toArray(function(_error, _result) {
            if (_error) throw _error;
            res.status(200).send({
              data: {
                success: true,
                messagge: "Centro comercial actualizado correctamente",
                data: _result
              }
            });
          });
        }
      );
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
};

exports.deleteMall = async (req, res, next) => {

  const {id} = req.quey;

  db.initialize(dbName, collectionName, dbCollection => {
    dbCollection.deleteOne({ _id: ObjectID(id) }, function(error, result) {
      if (error){
        return res.status(500).send({
          data: {
            success: false,
            messagge: "Database error",
            error: error.message
          }
        });
      };
      res.status(201).send({
        data: {
          success: true,
          messagge: "Centro comercial eliminado correctamente"
        }
      });
    });
  });
  
};
