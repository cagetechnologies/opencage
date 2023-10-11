import { Request, Response, Router } from "express";

import { Authentication } from "../authentication";

const knowledgeSetsRouter: Router = Router();

knowledgeSetsRouter.get('', async (req: Request, res: Response) => {

    let legit = Authentication.authentication(req);

    if (legit) {
        let db = req.app.locals.db;
    
        db.collection('knowledgesets').find({public: true }).toArray((err: any, knowledgeSets: any[]) => {
            for (let knowledgeSet of knowledgeSets) {
                knowledgeSet.id = knowledgeSet._id;
                delete knowledgeSet._id;
            }
            res.send(knowledgeSets);
        });

        
    }

});

export default knowledgeSetsRouter;