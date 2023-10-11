import { Request, Response, Router } from "express";
import { ObjectID } from "mongodb";

import { Authentication } from "../authentication";

const groupsRouter: Router = Router();

groupsRouter.post('', async (req: Request, res: Response) => {

    let legit = Authentication.authentication(req);

    if (legit !== null) {
        let db = req.app.locals.db;
        
        let group: any = {user: new ObjectID(legit.id), name: req.body.name, created: new Date() };
        db.collection('groups').insertOne(group, (err: any, results: any) => {
            var id = results.insertedId;
            console.log('Inserted id is ' + id);
            group['id'] = id;

            res.json({result: 0, group: group});
        });
    }

});

groupsRouter.get('', async (req: Request, res: Response) => {

    let legit = Authentication.authentication(req);

    if (legit) {
        let db = req.app.locals.db;

        let search = req.query.search;
        
        if (!search || search == '') {
            db.collection('groups').find({user: new ObjectID(legit.id) }).toArray(async (err: any, groups: any[]) => {
                for (let group of groups) {
                    group.id = group._id;
                    delete group._id;
                }
                res.json(groups);
            });  
        } else {
            console.log("Searching for " + search);
            db.collection('groups').find({ name: { $regex: search, $options:'i' }}).toArray(async (err: any, groups: any[]) => {
                for (let group of groups) {
                    group.id = group._id;
                    delete group._id;
                }
                res.json(groups);
            });  
        }
    }

});

export default groupsRouter;