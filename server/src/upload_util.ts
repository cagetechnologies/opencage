import { ObjectID } from "mongodb";

import sha256 from 'fast-sha256';
import { htmlToText } from 'html-to-text';
import parse from 'node-html-parser';
import { decodeUTF8 } from 'tweetnacl-util';

export class UploadUtil {
    static uploadCollectionUrl(db: any, collectionId: string, url: string, legit: any): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {

            let item: any = await UploadUtil.uploadUrl(url);
            
            let set: any = {user: new ObjectID(legit.id), collection: new ObjectID(collectionId), name: item.title, items: [item], created: item.date };
            
            db.collection('sets').insertOne(set);
    
            console.log('Saved set ' + JSON.stringify(set));
    
            set.id = set._id;
            delete set._id;
            
            delete item.text;

            resolve(set);
        });   
    }

    static uploadSetUrl(db: any, collectionId: string, setId: string, url: string, legit: any): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {

            let item: any = await UploadUtil.uploadUrl(url);
            
            db.collection('sets').updateOne({_id: new ObjectID(setId)},{$push:{'items':item}});
    
            console.log('Saved item ' + JSON.stringify(item));

            delete item.text;

            resolve(item);
        });
        
    }

    static uploadUrl(url: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            const got = require('got');

            let response = await got(url);
    
            console.log('Got response ' + response.body);
    
            let html = response.body;
            const root = parse(html);
            let title = root.querySelector('title')?.innerHTML;
            const text = htmlToText(html);
            let decodedText = decodeUTF8(text);
    
            const hash = sha256(decodedText);
    
            let hex = Buffer.from(hash).toString('hex')
    
            //console.log(hex);
    
            let id = new ObjectID();
            let index = url.lastIndexOf('/');
            let filename = url.substring(index+1);
            let date = new Date();
    
            let item: any = { id: id, title: title, path: url, filename: filename, hash: hex, updated: date, text: text };
    
            resolve(item);
        });
    }

    static processUrl(url: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            const got = require('got');
            const form = new FormData();
            form.append('url', url);
            form.append('email', 'eric@erichey.com');
            form.append('type','developer');
            form.append('ts', '' + Date.now());
            form.append('key', '123456');

            try {
                let result = await got.post('https://server.proggor.com', { form: true, body: form });
                resolve(result);
            } catch (e) {
                console.log(e);
            }
            reject();
        });
            
    }


}