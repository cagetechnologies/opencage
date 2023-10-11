import { Request, Response, Router } from "express";
import { ObjectID } from "mongodb";

import { Authentication } from "../authentication";
import { PersonUtil } from "../utils/person_util";

const contactsRouter: Router = Router();

contactsRouter.post('', async (req: Request, res: Response) => {

    let legit = Authentication.authentication(req);

    if (legit !== null) {
        let db = req.app.locals.db;
        
        let contact: any = {user: new ObjectID(legit.id), person: req.body.person, created: new Date() };
        db.collection('contacts').insertOne(contact, (err: any, results: any) => {
            var id = results.insertedId;
            console.log('Inserted id is ' + id);
            contact['id'] = id;

            res.json({result: 0, contact: contact});
        });
    }

});

contactsRouter.get('', async (req: Request, res: Response) => {

    let legit = Authentication.authentication(req);

    console.log('Getting contacts');

    if (legit) {
        let db = req.app.locals.db;
    
        //let contacts = [];
        db.collection('contacts').find({user: new ObjectID(legit.id) }).toArray(async (err: any, contacts: any[]) => {
            for (let contact of contacts) {
                //let contact: any = {};
                contact.id = contact._id;
                delete contact._id;
                contact.person = await PersonUtil.getPerson(db, contact.person);
            }
            res.json(contacts);
        });  
    }

});

export default contactsRouter;