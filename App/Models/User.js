const Model = require('./Model.js');

module.exports = class User extends Model{
    fillable = ['name', 'email', 'cellphone','password'];
    //hidden = ['password'];
    table = 'users';

    constructor(){
        super();
    }
}