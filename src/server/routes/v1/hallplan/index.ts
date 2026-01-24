import { Router } from 'express';
import { AppRoute } from '../../../../common/constants/routes';
import { hallplanMatrixService } from '../../../services/hallplan-matrix';
import { seatTypeService } from '../../../services/seat-type';
import { HallplanController } from './HallplanController';

const hallplan = Router();

const hallplanController = new HallplanController(hallplanMatrixService, seatTypeService);

hallplan.get(AppRoute.ROOT, hallplanController.getHallplan);

export { hallplan };
