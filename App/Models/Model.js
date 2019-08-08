const DatabaseFactory = require('../Classes/DatabaseFactory.js');
const conn = DatabaseFactory.getConnection();

module.exports = class Model{
    fillable = [];
    hidden = [];
    table = '';

    constructor(){
    }

    insert(callback){
        var fields = [];
        var values = [];
        for(let field of this.fillable){
            var value = eval(`this.${field}`);
            if(value){
                fields.push(field);
                values.push( "'" + value + "'" );
            }
        }
        var query = `INSERT INTO ${this.table} ( ${fields.join(',')} ) VALUES ( ${values.join(',')} )`;
        console.log(query);
        conn.query(query, callback);
    }

    save(callback){
        if(this.id)
            this.update(callback);
        else
            this.insert(callback);
    }

    update(callback){
        var assignments = [];
        for(let field of this.fillable){
            var value = eval(`this.${field}`);
            if(value){
                assignments.push(`${field} = '${value}'`);
            }
        }
        var query = `UPDATE ${this.table} SET ${assignments.join(',')} WHERE id = ${this.id}`;
        console.log(query);
        conn.query(query, callback);
    }
    
    delete(callback){
        var query = `DELETE FROM ${this.table} WHERE id = ${this.id}`;
        console.log(query);
        conn.query(query, callback);
    }

    
    get(id, callback){
        var query = `SELECT * FROM ${this.table} WHERE id = ${id}`;
        console.log(query);
        conn.query(query, callback);
    }

    getAsExact(callback){
        var queryParams = [];
        var fields = this.fillable;
        fields.push('id');
        for(let field of fields){
            var value = eval(`this.${field}`);
            if(value){
                queryParams.push(`${field} = '${value}'`);
            }
        }

        var query = `SELECT * FROM ${this.table} WHERE ${queryParams.join(' AND ')}`;
        console.log(query);
        conn.query(query, callback);
    }

    fill(obj){
        for(let property of this.fillable){
            var value = eval(`obj.${property}`);
            if(value){
                if(typeof(value) == 'number')
                    eval(`this.${property} = ${value}`);
                else
                    eval(`this.${property} = "${value}"`);
            }
        }
    }

    static findById(id, callback){
        var model = this._getModel();
        model.get(id, callback);
    }

    static findByField(field, value, callback){
        var model = this._getModel();
        var query = `SELECT * FROM ${model.table} WHERE ${field} = '${value}'`;
        conn.query(query, callback);
    }

    static findByFields(fields, callback){
        var queryComparasions = [];
        for(var field of Object.keys(fields)){
            var value = eval(`fields.${field}`);
            var comparasion = `${field} = '${value}'`;
            queryComparasions.push(comparasion);
        }

        var model = this._getModel();
        var query = `SELECT * FROM ${model.table} WHERE ${queryComparasions.join(' AND ')}`;
        conn.query(query, callback);
    }

    static _getModel(){
        var className = this.name;
        var modelClass = require(`./${className}.js`);
        var model = new modelClass();
        return model;
    }

    static async getAsync(id){
        var model = this._getModel();
        var query = `SELECT * FROM ${model.table} WHERE id = ${id}`;
        console.log(query);
        return new Promise( (resolve, reject) => {
            conn.query(query, (error, result) => {
                if(error) return reject(error);
                return resolve(result);
            });
        });
    }

    static async findByFieldAsync(field, value){
        var model = this._getModel();
        var query = `SELECT * FROM ${model.table} WHERE ${field} = '${value}'`;
        console.log(query);
        return new Promise( (resolve, reject) => {
            conn.query(query, (error, result) => {
                if(error) return reject(error);
                return resolve(result);
            });
        });
    }
}