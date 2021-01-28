import {Router, Request, Response} from 'express';
import { execPath } from 'process';
import certificateController from '../controllers/certificate';
import csvController from '../controllers/importCsv';

const router = Router();

router.post('/', certificateController.addCertificate);
// router.get('/:id', certificateController.getCertificate); 
router.get('/csv', csvController);
router.post('/download/:id', certificateController.hitDownloadCertificate);

export default router;