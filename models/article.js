"use strict";

const sequelize = require("./database"); //importamos bdatos
const Sequelize = require("sequelize"); //req seq

const User = require("./user");


// Asegurate que tu Postgres este corriendo!

//---------VVVV---------  tu código aquí abajo  ---------VVV----------

//creamos clase article 
class Article extends Sequelize.Model {}

//Creamos el modelo(tabla)de la base de datos 
Article.init({
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    snippet: {
      type: Sequelize.VIRTUAL,
      get() {
        const articleContent = this.getDataValue('content');
        console.log('CONTENIDO', articleContent)
        return articleContent.slice(0, 23) + "...";
      }
    }
  },

}, { sequelize, modelName: "article" });
//---------^^^---------  tu código aquí arriba  ---------^^^----------

//Relaciones entre tablas 
Article.belongsTo(User, { as: 'author' });

//exportamos el modelo 
module.exports = Article;
