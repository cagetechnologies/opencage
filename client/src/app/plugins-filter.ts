import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pluginsfilter',
    pure: false
})
export class PluginsFilterPipe implements PipeTransform {
    transform(items: Plugin[], filter: Object): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.name.indexOf(filter['name']) !== -1);
    }
}