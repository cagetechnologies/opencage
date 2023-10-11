import { Request, Response, Router } from "express";
import { ObjectID } from "mongodb";

import { Authentication } from "../authentication";

const pluginsRouter: Router = Router();

pluginsRouter.get('', async (req: Request, res: Response) => {

    let legit = Authentication.authentication(req);

    if (legit) {
        let db = req.app.locals.db;
    
        db.collection('plugins').find({public: true }).toArray((err: any, plugins: any[]) => {
            /*for (let plugin of plugins) {
                delete collection.items[0].text;
            }*/
            res.send(plugins);
        });

        
    }

});

export default pluginsRouter;