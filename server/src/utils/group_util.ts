import { ObjectID } from "mongodb";

export class GroupUtil {
    static getGroup(db: any, id: ObjectID) : Promise<any> {
        let myDb = db;
        return new Promise<any>((resolve, reject) => {
            console.log("Getting group for " + id);
            myDb.collection("groups").findOne({_id: id}, (err: any, result: any) => {
                console.log("Found group " + JSON.stringify(result));
                result.id = result._id;
                delete result._id;

                resolve(result);
            });
        });
    }
}