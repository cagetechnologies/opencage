import { Request, Response, Router } from "express";
import { ObjectID } from "mongodb";

import { Authentication } from "../authentication";
import { GroupUtil } from "../utils/group_util";
import { PersonUtil } from "../utils/person_util";

const membershipsRouter: Router = Router();

membershipsRouter.post('', async (req: Request, res: Response) => {

    let legit = Authentication.authentication(req);

    if (legit !== null) {
        let db = req.app.locals.db;
        
        let membership: any = {user: new ObjectID(legit.id), group: new ObjectID(req.body.group), created: new Date() };
        db.collection('memberships').insertOne(membership, async (err: any, results: any) => {
            var id = results.insertedId;
            console.log('Inserted id is ' + id);
            membership['id'] = id;
            membership['group'] = await GroupUtil.getGroup(db, membership['group']);

            res.json({result: 0, membership: membership});
        });
    }

});

membershipsRouter.get('', async (req: Request, res: Response) => {

    let legit = Authentication.authentication(req);

    console.log('Getting memberships');

    if (legit) {
        let db = req.app.locals.db;
    
        //let contacts = [];
        db.collection('memberships').find({user: new ObjectID(legit.id) }).toArray(async (err: any, memberships: any[]) => {
            for (let membership of memberships) {
                //let contact: any = {};
                membership.id = membership._id;
                delete membership._id;
                membership.group = await GroupUtil.getGroup(db, membership.group);
            }
            res.json(memberships);
        });  
    }

});

export default membershipsRouter;