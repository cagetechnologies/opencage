import { Request, Response, Router } from "express";
import { ObjectID } from "mongodb";

import { Authentication } from "../authentication";

const peopleRouter: Router = Router();

peopleRouter.post('', async (req: Request, res: Response) => {

    let legit = Authentication.authentication(req);

    if (legit !== null) {
        let db = req.app.locals.db;
        
        let person: any = req.body.person;
        db.collection('persons').insertOne(person, (err: any, results: any) => {
            var id = results.insertedId;
            console.log('Inserted id is ' + id);
            person['id'] = id;

            res.json({result: 0, person: person});
        });
    }

});

peopleRouter.get('', async (req: Request, res: Response) => {

    let legit = Authentication.authentication(req);

    if (legit) {
        let db = req.app.locals.db;
    
        let search = req.query.search;
        
        if (!search || search == '') {
            db.collection('persons').find({user: new ObjectID(legit.id) }).toArray(async (err: any, people: any[]) => {
                for (let person of people) {
                    person.id = person._id;
                    delete person._id;
                }
                res.json(people);
            });  
        } else {
            console.log("Searching for " + search);
            db.collection('persons').find({ name: { $regex: search, $options:'i' }}).toArray(async (err: any, people: any[]) => {
                for (let person of people) {
                    person.id = person._id;
                    delete person._id;
                }
                res.json(people);
            });  
        }
    }

});

export default peopleRouter;