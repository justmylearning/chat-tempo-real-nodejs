/*
* SISTEMA DE ROTAS NÃO IMPLEMENTADO
*/

class NodeRoute {
    constructor(route, controllerAction){
        this.route = route;
        this.controllerAction = controllerAction;
    }
}

class NodeRoutes {
    static nodeRoutes = [];

    static add(route, controllerAction){
        NodeRoutes.nodeRoutes.push( new NodeRoute(route, controllerAction) );
    }

    static get(url){
        for(let route of NodeRoutes.nodeRoutes){
            if(route.route == url)
                return route;
        }
    }
}

NodeRoutes.add('/', 'App/Controllers/UserController@index');

console.log('Rotas: ');
console.log(NodeRoutes);