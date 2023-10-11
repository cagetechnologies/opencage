export class PluginRepository {
    id?: string;
    name?: string;
    handle?: string;
    description?: string;
    type?: string;
    src: string;
    instance?: any;
    loaded?: boolean;
}