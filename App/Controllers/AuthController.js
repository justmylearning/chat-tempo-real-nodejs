const express = require('express');
const router = express.Router();
const userService = require('../Services/UserService.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

router.post('/api/auth', async (req, res) => {
    const {email, password} = req.body;
    try{
        var result = await userService.findByFieldAsync('email', email);
        if(!result)
            return res.status(404).json(
                {
                    message:'Usuario nao encontrado'
                }
            );
        var user = result[0];

        if(!bcrypt.compare(password, user.password))
            return res.status(401).json(
                {
                    message:'Senha incorreta'
                }
            );
        
        console.log(user);
        user.password = undefined;
        user.token = generateToken();
        return res.json(
            {
                body:user
            }
        );
    }
    catch(err){ console.log(err); res.json({message:'Ocorreu um erro'}) }
});

module.exports = router;

function generateToken(userId){
    return jwt.sign({id:userId}, authConfig.secret);
}