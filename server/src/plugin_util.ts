import * as mongo from 'mongodb';

export class PluginUtil {
    static getPlugin(db: any, pluginId: any): Promise<any[]> {
        return new Promise( (resolve, reject) => {
            let plugins: any[] = [];
            db.collection('plugins').findOne({ _id: new mongo.ObjectID(pluginId) },(err: any, pluginResult: any[]) => {
                console.log('Found plugin ' + JSON.stringify(pluginResult));
                resolve(pluginResult);
            });
        });
    }
}
