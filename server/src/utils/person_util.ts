import { ObjectID } from "mongodb";

export class PersonUtil {
    static getPerson(db: any, id: ObjectID) : Promise<any> {
        let myDb = db;
        return new Promise<any>((resolve, reject) => {
            console.log("Getting person for " + id);
            myDb.collection("persons").findOne({_id: id}, (err: any, result: any) => {
                //console.log("Found person " + JSON.stringify(result));
                result.id = result._id;
                delete result._id;

                resolve(result);
            });
        });
    }
}