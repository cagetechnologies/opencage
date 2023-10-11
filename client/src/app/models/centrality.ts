export class Centrality {
    relationships: Map<string, WordRelationships> = new Map<string, WordRelationships>();

    addWordPair(word1: string, word2: string) {
        let relationship;
        if (this.relationships.has(word1)) {
            relationship = this.relationships.get(word1);
        } else {
            relationship = new WordRelationships();
            relationship.word = word1;
            this.relationships.set(word1, relationship);
        }
        relationship.relationships.push(word2);
        if (this.relationships.has(word2)) {

        } else {
            relationship = new WordRelationships();
            this.relationships.set(word2, relationship);
        }

        let found = false;
        /*for (let existingWord of relationship.relationships) {
            if (existingWord == word2) {
                found = false;
            }
        }*/
        if (!found) {
            relationship.relationships.push(word2);
        }
    }

    getWordRelationships() {
        let relationships: WordRelationships[] = [];
        for (let word in this.relationships) {
            let relationship = this.relationships.get(word);
            relationships.push(relationship);
        }
        relationships.sort(this.compareRelationships);

        return relationships;
    }

    compareRelationships(relationship1, relationship2): number {
        if (relationship1.relationships.length > relationship2.relationships.length) {
            return 1;
        } else if (relationship2.relationships.length > relationship1.relationships.length) {
            return -1;
        } else {
            return 0;
        }
    }
}

export class WordRelationships {
    word: string;
    relationships: string[] = [];
}