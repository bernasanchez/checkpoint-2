const express = require("express");//requerimos express
const router = express.Router(); //instancia de enrutamiento de express

const Article = require("../models/article");//requerimos el modelo article
const chalk = require("chalk");

// router.use(express.json()) (ver si hay q agregarlo o no)

//Comprobamos que funcione la ruta
// router.get("/articles", function (req, res, next) {
//   res.send("LLEGANDO RUTA ARTICLES");
// });

/**
 *
 *___ _____ _   ___ _____   _  _ ___ ___ ___
 / __|_   _/_\ | _ \_   _| | || | __| _ \ __|
 \__ \ | |/ _ \|   / | |   | __ | _||   / _|
 |___/ |_/_/ \_\_|_\ |_|   |_||_|___|_|_\___|
 *
 *
 */

//Rutas GET
router.get('/articles', (req, res, next) => {
  // const array = [];
  // res.status(200).send(array)
  Article.findAll(req.body)
    .then((articulo) => res.status(200).send(articulo))
    .catch(next)
})

router.get('/articles/:id', (req, res, next) => {
  
  Article.findOne({
    where: {
      id: req.params.id
    },
  })
  .then((articleId) => {
    if(!articleId) res.sendStatus(404);
    res.status(200).send(articleId)
    //.then((articleId) => console.log(articleId))
  })
  .catch(next);
});

//Rutas POST
router.post('/articles', (req, res, next) => {
  //requerimos title y content de body
  const { title, content} = req.body;

  Article.create({ title, content })
    .then(article => {
      // console.log('ARTICULO ARTICLE', article)
      const respuesta = {
        message: 'Created successfully',
        article: {
          id: article.id,
          title: article.title,
          content: article.content,
          extraneous: undefined,
          createdAt: article.createdAt

        },
      };
      // console.log('ARTICULO RESPUESTA', respuesta)
      res.status(201).send(respuesta);
    })
    .catch((next));
});


//Rutas PUT
router.put("/articles/:id", (req, res, next) => {
  //traemos el id del article 
  const articleId = req.params.id

  Article.findByPk(articleId)
  .then((article) => {
      const respuesta = {
        message: "Updated successfully",
        article: {
          id: req.params.id,
          title: req.body.title || res.content,
          content: req.body.content || article.content,
        },
      };
      res.status(200).send(respuesta);
    })
    .catch(next);
});


//exportamos rutas 
module.exports = router;
