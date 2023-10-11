import { Request, Response, Router } from "express";
import { ObjectID } from "mongodb";

import { Authentication } from "../authentication";

const userPluginsRouter: Router = Router();

userPluginsRouter.get('', async (req: Request, res: Response) => {

    let legit = Authentication.authentication(req);

    if (legit) {
        let db = req.app.locals.db;
    
        db.collection('userplugins').find({user: new ObjectID(legit.id) }).toArray((err: any, plugins: any[]) => {
            /*for (let plugin of plugins) {
                delete collection.items[0].text;
            }*/
            res.send(plugins);
        });

        
    }

});

userPluginsRouter.post('', (req: any, res: any) => {
    let legit = Authentication.authentication(req);

    if (legit) {
        let db = req.app.locals.db;

        let plugin = req.body;

        plugin.user = new ObjectID(legit.id);
    
        db.collection('users').updateOne({ _id: new ObjectID(legit.id) }, { $push: { plugins: { _id: new ObjectID(plugin._id) }}});

        res.send(plugin);
    }
});

export default userPluginsRouter;