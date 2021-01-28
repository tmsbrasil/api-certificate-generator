import { Request, Response } from 'express';
import { resolve } from 'path';
// import { parse } from '@fast-csv/parse';
import * as fs from 'fs';
import { parseFile } from 'fast-csv';
import { IParticipant } from '../models/certficate';
import { values } from 'sequelize/types/lib/operators';
import removeDuplicates from '../commons/filters';

const participants: IParticipant[] = [];
 
export default function csvParser(req: Request, res: Response){
    parseFile(resolve(__dirname, '..', 'assets/csv', 'participants.csv'))
    .on('error', error => console.error(error))
    .on('data', row => {
       
        let newParticipant = {
            name: row[0],
            email: row[1]
        } as IParticipant;

        participants.push(newParticipant);

    })
    .on('end', () => {});

    //remove duplicate values
    const participantsFiltered = removeDuplicates(participants, 'email');

    // res.status(200).json(participantsFiltered);
    //SAVE THE PARTICIPANTS IN DB    

}