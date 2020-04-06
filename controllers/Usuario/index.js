const ObjectID = require("mongodb").ObjectID;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../db");
require('dotenv').config();

const dbName = process.env.DB_NAME;
const collectionName = "Usuario";


exports.setUsuario = async (req, res, next) => {
  db.initialize(dbName, collectionName, async dbCollection => {
    const { body } = req;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(body.Password, salt, (err, hash) => {
        if (err) {
          return res.status(405).send({
            data: {
              success: false,
              error: err
            }
          });
        }
        body.Password = hash;
      });
    });

    const correo = await dbCollection.findOne({ Correo: body.Correo });
    if (correo) {
      res.status(400).send({
        data: {
          success: false,
          messagge: "Email already exists."
        }
      });
    } else {
      dbCollection.insertOne(body, (error, result) => {
        if (error) {
          res.status(500).send({
            data: {
              success: false,
              messagge: error.message
            }
          });
        }

        const token = jwt.sign(
          {
            data: body
          },
          process.env.SecretKey,
          {
            expiresIn: 604800
          }
        );

        result.ops[0]["token"] = "JWT " + token;
        delete result.ops[0]["Password"];

        res.status(201).send({
          data: {
            success: true,
            messagge: "Usuario registrado correctamente",
            data: result.ops
          }
        });
      });
    }
  });
};

exports.getUsuario = async (req, res, next) => {
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
          messagge: "Listado de todos los Usuarios",
          data: result
        }
      });
    });
  });
};

exports.updateUsuario = async (req, res, next) => {
  try {
    if (!req.query.id) {
      res.status(404).send({
        data: {
          success: false,
          messagge: "No se proporciono parametro de busqueda"
        }
      });
    } else {
      db.initialize(dbName, collectionName, dbCollection => {
        const id = req.query.id;
        const { body } = req;

        if(body.Password){
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(body.Password, salt, (err, hash) => {
              if (err) {
                return res.status(400).send({
                  data: {
                    success: false,
                    error: err
                  }
                });
              }
              body.Password = hash;
            });
          });
        }
        
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
            dbCollection.findOne({ _id: ObjectID(id) }, (_error, _result) => {
              if (error) {
                res.status(500).send({
                  data: {
                    success: false,
                    messagge: "Database error",
                    error: error.message
                  }
                });
              }
              res.status(201).send({
                data: {
                  success: true,
                  messagge: "Usuario actualizado correctamente",
                  data: _result
                }
              });
            });
          }
        );
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
};

exports.deleteUsuario = async (req, res, next) => {
  const {id} = req.query
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
          messagge: "Usuario eliminado correctamente"
        }
      });
    });
  });
  
};

exports.login = async (req, res, next) => {
  const { body } = req;
  db.initialize(dbName, collectionName, async dbCollection => {
    const user = await dbCollection.findOne({ Nombre: body.Nombre });
    if (!user) {
      return res.status(400).send({
        data: {
          success: false,
          message: "Usuario no encontrado"
        }
      });
    }
    const isMatch = await bcrypt.compare(body.Password, user.Password);
    if (!isMatch) {
      return res.status(400).send({
        data: {
          success: false,
          message: "Password Incorrecto"
        }
      });
    }

    const token = jwt.sign(
      {
        data: {
          _id: user._id,
          Nombre: user.Nombre,
          Correo: user.Correo,
          Perfil: user.Perfil
        }
      },
      process.env.SecretKey,
      {
        expiresIn: 604800
      }
    );
    return res.status(200).send({
      success: true,
      messagge: "Usuario logeado correctamente",
      data: "JWT " + token
    });
  });
};
