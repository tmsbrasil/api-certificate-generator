//app.ts
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import certificateRouter from './routes/certificates';
import database from './db';

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(certificateRouter);

(async() => {
    try{
        const port = parseInt(`${process.env.PORT}`);

        await database.sync();
        console.log(`Running database ${process.env.DB_NAME}`);
    
        await app.listen(port, () => {
            console.log(`Rodando na porta ${port}`);
        });        
    }
    catch(error){
        console.log(`${error}`);
    }

})();