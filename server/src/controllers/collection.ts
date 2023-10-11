import { Request, Response, Router } from "express";

import { ObjectID } from "mongodb";
import { Authentication } from "../authentication";
import { SetUtil } from "../set_util";
import { UploadFileUtil } from "../upload_file_util";
import { UploadUtil } from "../upload_util";

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const collectionRouter: Router = Router();

collectionRouter.post('', async (req: Request, res: Response) => {

    let legit = Authentication.authentication(req);

    if (legit !== null) {
        let db = req.app.locals.db;
        
        let collection: any = {user: new ObjectID(legit.id), name: req.body.name, created: new Date() };
        db.collection('collections').insertOne(collection, (err: any, results: any) => {
            var id = results.insertedId;
            console.log('Inserted id is ' + id);
            collection['id'] = id;

            res.json(collection);
        });
    }

});

collectionRouter.get('', async (req: Request, res: Response) => {

    let legit = Authentication.authentication(req);

    if (legit) {
        let db = req.app.locals.db;
    
        db.collection('collections').find({user: new ObjectID(legit.id) }).toArray(async (err: any, collections: any[]) => {
            for (let collection of collections) {
                collection.id = collection._id;
                delete collection._id;
                collection.sets = await SetUtil.getCollectionSets(db, collection);
            }
            res.send(collections);
        });  
    }

});

collectionRouter.get('/:id', async (req: Request, res: Response) => {
    let legit = Authentication.authentication(req);

    if (legit) {
        let db = req.app.locals.db;
    
        db.collection('collections').findOne({user: new ObjectID(legit.id), _id: new ObjectID(req.params.id) }, async (err: any, collection: any) => {
            
            if (collection) {
                collection.id = collection._id;
                delete collection._id;
                collection.sets = await SetUtil.getCollectionSets(db, collection);
                res.send(collection);
            } else {
                res.send({});
            }

        });
    }
});

collectionRouter.delete('/:id', (req, res) => {
    let legit = Authentication.authentication(req);

    if (legit) {
        let db = req.app.locals.db;
    
        db.collection('collections').deleteOne({user: new ObjectID(legit.id), _id: new ObjectID(req.params.id) }, (err: any, collection: any) => {
            
            res.send({result: 0});

        });
    }
});


collectionRouter.get('/:id/text', async (req, res) => {

    const fs = require('fs');

    let text = fs.readFileSync('./assets/test2.json');

    res.send(text);

    //let legit = Authentication.authentication(req);

    /*if (legit) {
        let db = req.app.locals.db;
    
        db.collection('collections').find({user: new mongo.ObjectID(legit.id) }).toArray((err: any, collections: any[]) => {
            for (let collection of collections) {
                delete collection.text;
            }
            res.send(collections);
        });

        
    }*/

});

collectionRouter.get('/:id/sets/:setId', (req, res) => {
    let legit = Authentication.authentication(req);

    if (legit) {
        let db = req.app.locals.db;
    
        db.collection('sets').findOne({user: new ObjectID(legit.id), collection: new ObjectID(req.params.id), _id: new ObjectID(req.params.setId) }, (err: any, set: any) => {
            
            if (set) {
                set.id = set._id;
                delete set._id;
                res.send(set);
            } else {
                res.status(404);
            }


        });
    }
});

collectionRouter.get('/:id/sets/:setId/items/:itemId', (req, res) => {
    let legit = Authentication.authentication(req);

    if (legit) {
        let db = req.app.locals.db;
    
        db.collection('sets').findOne({user: new ObjectID(legit.id), collection: new ObjectID(req.params.id), _id: new ObjectID(req.params.setId) }, (err: any, set: any) => {
            let itemId = req.params.itemId;
            if (set && set.items) {
                let found = false;
                for (let item of set.items) {
                    if (item.id == itemId) {
                        found = true;
                        res.send(item);
                    }
                }
                if (!found) {
                    res.status(404);
                }
            } else {
                res.status(404);
            }


        });
    }
});

collectionRouter.post('/:id/urls', async (req, res) => {

    let legit = Authentication.authentication(req);

    if (legit !== null) {
        let db = req.app.locals.db;
        if (req.body.url) {
            let url = req.body.url;
            let collectionId = req.params.id;

            let set = await UploadUtil.uploadCollectionUrl(db, collectionId, url, legit);

            res.json({result: 0, set: set});


        }
    }
});

collectionRouter.post('/:collectionId/files', upload.single('file'), async (req: any, res,next) => {

    let legit = Authentication.authentication(req);

    if (legit !== null) {
        let db = req.app.locals.db;
        
        console.log('Maybe we got a file ');
        try {
            if(!req.file) {
                res.send({
                    status: false,
                    message: 'No file uploaded'
                });
            } else {
                let collectionId = req.params.collectionId;
                //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
                let file = req.file;
                
                //Use the mv() method to place the file in upload directory (i.e. "uploads")
                //avatar.mv('./uploads/' + avatar.name);

                let set = await UploadFileUtil.uploadCollectionFile(db, collectionId, file, legit);
    
                if (set) {
                    res.send({result: 0, set: set});
                }
                //send response
                
            }
        } catch (err) {
            res.status(500).send(err);
        }
        //res.json({result: 0, item: {title:'file'}})
    }
});

collectionRouter.post('/:collectionId/sets/:id/urls', async (req, res) => {

    let legit = Authentication.authentication(req);

    if (legit !== null) {
        let db = req.app.locals.db;

        let url = req.body.url;
        let collectionId = req.params.collectionId;
        let setId = req.params.id;

        let item = await UploadUtil.uploadSetUrl(db, collectionId, setId, url, legit);

        res.json({result: 0, item: item});

    }
});

collectionRouter.post('/:collectionId/sets/:id/files', upload.single('file'), async (req: any, res,next) => {

    let legit = Authentication.authentication(req);

    if (legit !== null) {
        let db = req.app.locals.db;
        
        console.log('Maybe we got a file ');
        try {
            if(!req.file) {
                res.send({
                    status: false,
                    message: 'No file uploaded'
                });
            } else {
                let collectionId = req.params.collectionId;
                let setId = req.params.id;
                //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
                let file = req.file;
                
                //Use the mv() method to place the file in upload directory (i.e. "uploads")
                //avatar.mv('./uploads/' + avatar.name);

                let item = await UploadFileUtil.uploadSetFile(db, collectionId, setId, file, legit);
    
                if (item) {
                    res.send({result: 0, item: item});
                }
                //send response
                
            }
        } catch (err) {
            res.status(500).send(err);
        }
    }
});

collectionRouter.delete('/:collection/sets/:id', (req, res) => {
    let legit = Authentication.authentication(req);

    if (legit !== null) {
        let db = req.app.locals.db;
        db.collection('sets').deleteOne({_id: new ObjectID(req.params.id)}, (err: any, result: any) => {
            res.json({status: 0});
        });
    }
});

collectionRouter.delete('/:collection/sets/:set/items/:id', (req, res) => {
    let legit = Authentication.authentication(req);

    if (legit !== null) {
        let db = req.app.locals.db;
        db.collection('sets').updateOne({_id: new ObjectID(req.params.set)},{$pull:{items:{id: new ObjectID(req.params.id)}}}, (err: any, result: any) => {
            res.json({status: 0});
        });
    }
});

collectionRouter.post('/:collectionId/sets/:set/items/:id/process', (req, res) => {
    console.log('Processing');
    let legit = Authentication.authentication(req);

    if (legit !== null) {
        let db = req.app.locals.db;

        console.log("Searching for set " + req.params.set + " and items " + req.params.id);
        
        db.collection('sets').findOne({_id: new ObjectID(req.params.set)}, async (err: any, set: any) => {
            if (set) {
                for (let item of set.items) {
                    if (item.id == req.params.id) {
                        //console.log('Processing item ' + JSON.stringify(item));
                        let processResults = await UploadUtil.processUrl(item.path);
                        //console.log(processResults['body']);
                        let processed = processResults['body'];
                        let updateResult = await db.collection('sets').updateOne({_id: new ObjectID(req.params.set), 'items.id': new ObjectID(req.params.id)}, {$set: {'items.$.processed' : processed}}); //'<text>' + processResults + '</text>'}});
                        console.log('Set updated ' + JSON.stringify(updateResult));
                        res.json({status: 0, processed: processed});
                    }
                }
            } else {
                console.log('No result found');
            }
            
            
            res.json({status: 0});
        });
    }
});

export default collectionRouter;