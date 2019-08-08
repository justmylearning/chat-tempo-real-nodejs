const DatabaseFactory = require('../Classes/DatabaseFactory');
const conn = DatabaseFactory.getConnection();
const User = require('../Models/User.js');
const bcrypt = require('bcryptjs');

module.exports = class UserService{
    static async getAsync(id){
        return User.getAsync(id);
    }

    static get(id, callback){
        // new User().get(id, callback);
        User.findById(id, callback);
        // User.findByFields({id:id}, callback);
    }

    static async save(obj, callback){
        var user = new User();
        user.fill(obj);
        if(obj.id) user.id = obj.id;
        if(obj.password)
            user.password = await bcrypt.hash(obj.password, 10);
        user.save(callback);
    }

    static delete(id, callback){
        var user = new User();
        user.id = id;
        user.delete(callback);
    }

    static async findByFieldAsync(field, value){
        return User.findByFieldAsync(field, value);
    }
}