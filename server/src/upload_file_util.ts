import sha256 from "fast-sha256";
import { ObjectID } from "mongodb";
import { decodeUTF8 } from "tweetnacl-util";

export class UploadFileUtil {

    static uploadCollectionFile(db: any, collectionId: string, file: any, legit: any): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {

            let item: any = await UploadFileUtil.uploadFile(file);
            
            let set: any = {user: new ObjectID(legit.id), collection: new ObjectID(collectionId), name: item.title, items: [item], created: item.date };
            
            db.collection('sets').insertOne(set);
    
            console.log('Saved set ' + JSON.stringify(set));
    
            set.id = set._id;
            delete set._id;
            
            delete item.text;

            resolve(set);
        });   
    }

    static uploadSetFile(db: any, collectionId: string, setId: string, file: any, legit: any): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {

            let item: any = await UploadFileUtil.uploadFile(file);
            
            db.collection('sets').updateOne({_id: new ObjectID(setId)},{$push:{'items':item}});
    
            console.log('Saved item ' + JSON.stringify(item));

            delete item.text;

            resolve(item);
        });
        
    }

    static uploadFile(file: any): Promise<any | string> {
        return new Promise<any | string>((resolve, reject) => {
            let filename = file.originalname;

            console.log("file " + JSON.stringify(file));

            const textract = require('textract');
            textract.fromFileWithMimeAndPath( file.mimetype, file.path, ( error: any, text: string ) => {
                console.log("Error " + error);
                if (!error) {
                    console.log('Got text ' + text);

                    //let title = root.querySelector('title')?.innerHTML;
                    let title = filename;
                    let decodedText = decodeUTF8(text);
            
                    const hash = sha256(decodedText);
            
                    let hex = Buffer.from(hash).toString('hex')
            
                    let id = new ObjectID();
                    let date = new Date();
            
                    let item: any = { id: id, title: title, path: filename, filename: filename, hash: hex, updated: date, text: text };
            
                    resolve(item);
                } else {
                    resolve(error);
                }
            });

    //resolve(set);
        });
    }
}