import { PluginUtil } from "./plugin_util";

export class UserUtil {
    static getUserPlugins(db: any, user: any): Promise<any[]> {
        return new Promise( async (resolve, reject) => {
            let plugins: any[] = [];
            if (user.plugins) {
                for (let plugin of user.plugins) {
                    console.log("searching for plugin " + plugin._id);
                    if (plugin.type !== 'CUSTOM') {
                        let loadedPlugin = await PluginUtil.getPlugin(db, plugin._id);
                        if (loadedPlugin) {
                            console.log('Pushing plugin');
                            plugins.push(loadedPlugin);
                        }
                    } else {
                        plugins.push(plugin);
                    }
                }
            }
            resolve(plugins);
        });
    }
}