import { Router } from "express";
import { ObjectID } from "mongodb";
import { Authentication } from "../authentication";

const processRouter: Router = Router();

processRouter.get('', async (req, res) => {

    let legit = Authentication.authentication(req);

    if (legit) {
        let db = req.app.locals.db;
    
        db.collection('processes').find({user: new ObjectID(legit.id) }).toArray((err: any, processes: any[]) => {
            for (let process of processes) {
                //delete collection.items[0].text;
                process.id = process._id;
                delete process._id;
            }
            res.send(processes);
        });

        
    }

});

processRouter.post('', (req, res) => {
    let legit = Authentication.authentication(req);

    if (legit) {
        let db = req.app.locals.db;

        let process = req.body;

        process.user = new ObjectID(legit.id);
        
        db.collection('processes').insertOne(process, (err: any, results: any) => {
            let id = results.insertedId;

            delete process._id;

            process.id = id;

            res.json({status: 0, process: process});
        });

    }
});

processRouter.get('/:id', (req, res) => {
    let legit = Authentication.authentication(req);

    if (legit) {
        let db = req.app.locals.db;

        let process = req.body;

        db.collection('processes').findOne({ _id: new ObjectID(req.params.id) }, (err: any, result: any) => {
            result.id = result._id;
            delete result._id;
            res.json(result);

        });

    }
});

processRouter.post('/:id', (req, res) => {
    let legit = Authentication.authentication(req);

    if (legit) {
        let db = req.app.locals.db;

        let process = req.body;

        process.user = new ObjectID(legit.id);
        
        db.collection('processes').updateOne({ _id: new ObjectID(req.params.id) }, { $set: { json: process.json }}, (err: any, results: any) => {
            
            res.json({status: 0});

        });

    }
});

processRouter.delete('/:id', (req, res) => {
    let legit = Authentication.authentication(req);

    if (legit) {
        let db = req.app.locals.db;
        
        db.collection('processes').deleteOne({ _id: new ObjectID(req.params.id) }, (err: any, results: any) => {
            
            res.json({status: 0});

        });

    }
});


export default processRouter;