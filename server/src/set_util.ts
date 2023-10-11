import { ObjectId } from "mongodb";
import { Set } from "./set";

export class SetUtil {
    static getCollectionSets(db: any, collection: any): Promise<Set[]> {
        let myDb = db;
        return new Promise<Set[]>((resolve, reject) => {
            console.log("Getting sets for " + collection.id);
            myDb.collection("sets").find({collection: collection.id}).toArray(async (err: any, setResults: any[]) => {
                let sets = [];
                if (setResults) {
                    //console.log('Results are ' + JSON.stringify(results));
                    for (let result of setResults) {
                        //console.log("Found set " + JSON.stringify(result));
                        let set = result;
                        set.id = result._id;
                        delete set._id;
                        sets.push(set);
                    }
                }
                //console.log("Sets are " + JSON.stringify(sets));
                resolve(setResults);
            });
        });
    }
}