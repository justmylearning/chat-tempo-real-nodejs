const express = require('express');
const router = express.Router();
const userService = require('../Services/UserService.js');
//const userModel = require('../Models/User.js');
const authMiddleware = require('../Middlewares/AuthMiddleware.js');

router.get('/api/user/:id', authMiddleware, function(req, res){

    // userModel.find(1, (error, result) => {
    //     console.log('error: ' + error);
    //     console.log('result: ' + result);

    //     return res.json(
    //          {
    //              status:200,
    //              body:result
    //          }
    //     );
    // });

    userService.get(req.params.id, (error, result) => {
        
         console.log('error: ' + error);
         console.log('result: ' + result);
         if(error)
             return res.json(
                 {
                     status:500,
                     message: 'Ops... ocorreu um erro ao buscar'
                 }
             );

         if(result.length == 0)
             return res.json(
                 {
                     status:404,
                     message:'Nao encontrado'
                 }
             );

         else
             return res.json(
             {
                 status:200,
                 body:result,
                 message:'Hello world'
             }
         );

     });
 });

 router.post('/api/user', authMiddleware, (req, res) => {
    userService.save(req.body, (error, result) => {

        if(error)
             return res.json(
                 {
                     status:500,
                     message: 'Ops... ocorreu um erro ao criar'
                 }
             );

        var user = userService.get(result.insertId, (error, result) => {
            return res.json(
                {
                    status: 200,
                    body: result
                }
            );
        });

    });
 });

 router.put('/api/user/:id', authMiddleware, (req, res) => {
    userService.get(req.id, (error, result) => {

        if(error)
             return res.json(
                 {
                     status:500,
                     message: 'Ops... ocorreu um erro ao buscar'
                 }
             );

        userService.save(req.body, (error, result) => {
            if(error)
                return res.json(
                    {
                        status:500,
                        message: 'Ops... ocorreu um erro ao atualizar'
                    }
                );

            return res.json(
                {
                    status:200
                }
            )
        });
        

    })
 });

 router.delete('/api/user/:id', authMiddleware, (req, res) => {
    userService.delete(req.body.id, (error, result) => {

        if(error)
             return res.json(
                 {
                     status:500,
                     message: 'Ops... ocorreu um erro ao deletar'
                 }
             );

        return res.json(
            {
                status: 200
            }
        )
        
    });
 });

module.exports = router;