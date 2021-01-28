import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { ImportCall } from 'typescript';
import {ICertificate} from '../models/certficate';
import crypto from 'crypto';

const certificate : ICertificate[] = [];

async function addCertificate(req: Request, res: Response, next: any){
    try{        
        //GERAR PDF COM AS INFORMAÇÕES
        const newCertificate = req.body as ICertificate;        

        // const certificateHash = await bcrypt.hash('certificado1', 2);
        const certificateHash = crypto.randomBytes(10).toString('hex');

        // Create Document Component
        const cerficateInfo = {
            title: 'Certificado de Participação',
            subtitle: 'Concedemos este certificado a',
            participant: 'ANDRÉ FELIPE DA SILVA ALMEIDA',
            description: 'pela participação na Segunda Semana do Professor sem Fronteiras realizada de 31/08 a 04/09 de 2020 com carga horária de 8h.',
            signName: 'Tiago Marinho',
            signDesc: 'Professor e Coordenador do Evento',
            validation: `autenticidade: youteach.com.br/certificate/${certificateHash}`
        };  

        const pdfConfigs = { 
            info: {
                Title: cerficateInfo.title + ' - ' + cerficateInfo.participant,
                Author: 'YouTeach',
                Subject: cerficateInfo.description
            },
            size: [2000,1414],
            margins: {
                top:0,
                bottom:0,
                left:0,
                right:0
            },
            bufferPages: true
        };
        
        const fs = require('fs');
        const path = require('path');
        const PDFDocument = require('pdfkit');
        const certificatePDF = new PDFDocument(pdfConfigs);
        certificatePDF.pipe(fs.createWriteStream(`src/assets/${certificateHash}.pdf`)); // write to PDF

        //Header Img
        certificatePDF
        .image('src/assets/modelo-header-v1.png', 0, 0, {width:2000, height:232});

        //Title
        certificatePDF
        .font('src/assets/fonts/Merriweather-Regular.otf')
        .fontSize(80)
        .text(cerficateInfo.title,0,250, { align:'center'});

        //Subtitle
        certificatePDF
        .moveDown(0.5)
        .font('src/assets/fonts/Forum-Regular.otf')
        .fontSize(40)
        .text(cerficateInfo.subtitle, { align:'center'});

        //Name
        certificatePDF
        .moveDown()
        .font('src/assets/fonts/Forum-Regular.otf')
        .fontSize(120)
        .text(cerficateInfo.participant,{ align:'center'});

        //Description
        certificatePDF
        .font('src/assets/fonts/Forum-Regular.otf')
        .fontSize(40)
        .text(cerficateInfo.description,500,650, { width:1000, align:'center'});

        //Sign Img
        certificatePDF
        .moveDown()
        .image('src/assets/rubrica-tiago.png',830,800, {width:282, height:120, align:'center'})
        .moveDown();

        //Sign Name
        certificatePDF
        .moveDown()
        .font('src/assets/fonts/Forum-Regular.otf')
        .fontSize(40)
        .text(cerficateInfo.signName, { width:1000, align:'center'});

        //Sign Description
        certificatePDF
        .moveDown(0.5)
        .font('src/assets/fonts/Forum-Regular.otf')
        .fontSize(30)
        .text(cerficateInfo.signDesc, { width:1000, align:'center'});

        //Authenticate
        certificatePDF
        .moveDown(0.5)
        .font('src/assets/fonts/Forum-Regular.otf')
        .fontSize(25)
        .text(cerficateInfo.validation, {
            width:1000,
            align:'center', 
            link: 'https://youteach.com.br/certificate/'+ certificateHash, 
            underline:true
        });
        
        //Footer Img        
        certificatePDF
        .image('src/assets/modelo-footer-v1.png', 0, 1116, {width:2000, height:298});

        certificatePDF.end();

        certificate.push(newCertificate);
        res.status(201).json(newCertificate);
        
        //SAVE PDF

        //ADD CERTIFICATE IN DATABASE

    }
    catch(error){
        console.log(error);
        res.status(400).end();
    }
}

function getCertificate(req: Request, res: Response, next: any){
    console.log('rota get certificate');
};

function hitDownloadCertificate(req: Request, res: Response, next: any){
    
};

export default { addCertificate, getCertificate, hitDownloadCertificate};