export class DataToken {
    word!: string;
    frequency: number;
    age: number;
}

export class FocusTransition {

    frequencyComparison(token1, token2) {
        if (token1.frequency < token2.frequency) {
            return 1;
        }

        if (token1.frequency > token2.frequency) {
            return -1;
        }

        return 0;
    }

    frequencyAgeComparison(token1, token2) {
        let frequencyAge1 = token1.frequency / (token1.age + 1);
        let frequencyAge2 = token2.frequency / (token2.age + 1);
        if (frequencyAge1 < frequencyAge2) {
            return 1;
        }

        if (frequencyAge1 > frequencyAge2) {
            return -1;
        }

        return 0;
    }

    map = new Map<string, DataToken>();
    array: DataToken[] = [];

    process(data: any) {

        if (data && data['complete_document']) {
            let completeDocument = data['complete_document'];
            if (completeDocument['notes']) {
                //this.list = [];
                //this.obj = {};
                for (let note of completeDocument['notes']) {
                    console.log('Note ' + JSON.stringify(note));
                    //let a = note.a;
                    //let b = note.b;

                    for (let token of note['tokens']) {
                        if (token['spelling'] && token['category'] === 'Noun') {
                            for (let dataToken of this.array) {
                                dataToken.age += 1;
                            }

                            let spelling = token['spelling'];
                            let mapDataToken: DataToken = this.map.get(spelling);
                            if (mapDataToken !== undefined) {
                                mapDataToken.frequency += 1;
                                mapDataToken.age = 0;
                            } else {
                                let dataToken = { word: spelling, frequency: 1, age: 0 };
                                this.map.set(spelling, dataToken);
                                this.array.push(dataToken);
                            }
                        }
                    }

                    //this.addWord(a);
                    //this.addWord(b);


                    this.array.sort(this.frequencyAgeComparison);

                    /*for (let key of this.map.keys()) {
                        let dataToken = this.map.get(key);
                        //let array = [key, this.map[key]];
                        console.log('Found ' + key + ' frequency of ' + dataToken.frequency);
                        //this.list.push(array);
                    }*/

                    let index = 0;
                    console.log('Main focus is:');
                    for (let dataToken of this.array) {
                        console.log('Found ' + dataToken.word + ' frequency of ' + dataToken.frequency);
                        index++;

                        if (index > 5) {
                            break;
                        }
                    }
                }
                //WordCloud(this.wordCloudCanvas.nativeElement, { list: this.list });
            }
            //this.text = JSON.stringify(value['complete_document']);

        } else {
            console.log("Did not detect any complete_document section");
        }
    }
}