import { PluginRepository } from "./plugin-repository";

interface Scripts {
    name: string;
    src: string;
    loaded?: boolean;
  }  
  
export class PluginFactory {
    static plugins = [
        { id: 'SENTENCES', name: 'Sentences', type: 'VISUALIZATION' },
        { id: 'NOTES', name: 'Notes', type: 'VISUALIZATION' },
        { id: 'WORD_CLOUD', name: 'Word Cloud', type: 'VISUALIZATION' },
        { id: 'NODE_GRAPH', name: 'Node Graph', type: 'VISUALIZATION' },
        { name: 'Histogram' },
        { name: 'Flow Chart' },
        { name: 'Word Frequency' },
        { name: 'Media Centrality' },
        { name: 'Focus Transitions' }
    ]

    static loadScript(pluginRepository: PluginRepository, script: Scripts) {
        return new Promise((resolve, reject) => {
          //resolve if already loaded
          if (script.loaded) {
              resolve({script: script.name, loaded: true, status: 'Already Loaded'});
          }
          else {
              //load script
              let scriptTag: any = document.createElement('script');
              scriptTag.type = 'text/javascript';
              scriptTag.src = pluginRepository.src + '/' + script.src;
              if (scriptTag.readyState) {  //IE
                scriptTag.onreadystatechange = () => {
                      if (scriptTag.readyState === "loaded" || scriptTag.readyState === "complete") {
                          scriptTag.onreadystatechange = null;
                          script.loaded = true;
                          resolve({script: script.name, loaded: true, status: 'Loaded'});
                      }
                };
              } else {  //Others
                scriptTag.onload = () => {
                      script.loaded = true;
                      resolve({script: script.name, loaded: true, status: 'Loaded'});
                };
              }
              scriptTag.onerror = (error: any) => resolve({script: script.name, loaded: false, status: 'Loaded'});
              console.log('Adding head for script ' + pluginRepository.handle);
              document.getElementsByTagName('head')[0].appendChild(scriptTag);
          }
      });
      }
}
