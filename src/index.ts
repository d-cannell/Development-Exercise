import fs from 'fs';
import { Clause } from './clause/Clause';
import { ClauseManager } from './clause/ClauseManager';

fs.readFile('data.txt', 'utf-8', (err, data) => {
    if (err) return console.error(err);
    return handleData(data);
});

/**
 * Takes a string containing data regarding Clauses,
 * parses the data into a list of Clause objects,
 * and then filters and displays duplicate objects from within the data.
 * @param data The full string containing a JSON object with Clause data.
 */
const handleData = (data: string) => {
    const clauses: Clause[] = JSON.parse(data.replace(/\\/g, ''));
    ClauseManager.outputClauses(clauses);
};

