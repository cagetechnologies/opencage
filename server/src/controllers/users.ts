import { Request, Response, Router } from "express";
import { MongoClient, ObjectId, ObjectID } from "mongodb";
import { Authentication } from "../authentication";

const usersRouter: Router = Router();

usersRouter.get('/:id', async (req: Request, res: Response) => {

    console.log('Trying GET users');
    let legit = Authentication.authentication(req);

    if (legit) {
        let db = req.app.locals.db;
    
        db.collection('users').findOne({_id: new ObjectID(req.params.id) }, async (err: any, user: any) => {
            console.log('user is ' + JSON.stringify(user));
            if (user.person) {
                let err, person = await db.collection('persons').findOne({_id: new ObjectId(user.person)});
                console.log("Person is " + JSON.stringify(person));
                if (person != null) {
                    user.personDetail = person;

                    let err, contents = await db.collection('contents').findOne({person: person._id});
                    if (contents) {
                        person.contents = contents;
                    }

                    if (person.memberships) {
                        let groups = [];
                        for (let membership of person.memberships) {
                            let err, group = await db.collection('groups').findOne({_id: new ObjectId(membership)});
                            if (group) {
                                group.id = group._id;
                                delete group._id;
                                groups.push(group);
                            }
                        }
                        if (groups && groups.length > 0) {
                            person.groups = groups;
                        }
                    }
                }
            }

            res.send(user);
        });  
    }

});

usersRouter.post(':id', async (req: Request, res: Response) => {

    let legit = Authentication.authentication(req);

    if (legit !== null) {
        let db = req.app.locals.db;
        
        let collection = {user: new ObjectID(legit.id), name: req.body.name, created: new Date() };
        db.collection('collections').insertOne(collection);

        res.json(collection);
    }

});

export default usersRouter;