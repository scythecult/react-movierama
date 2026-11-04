import { Router } from 'express';
import { AppRoute } from '../../../../common/constants/routes';
import { getHallplanQuerySchema } from '../../../../common/entities/hallplan';
import { GetHallplanUseCase } from '../../../lib/use-cases/hallplan/GetHallplanUseCase';
import { validationMiddlewareBuilder } from '../../../middleware/validation-middleware-builder/validationMiddlewareBuilder';
import { currentLocationService } from '../../../services/current-location';
import { hallplanMatrixService } from '../../../services/hallplan-matrix';
import { seatTypeService } from '../../../services/seat-type';
import { HallplanController } from './HallplanController';

const hallplan = Router();

const hallplanController = new HallplanController({
  getHallplan: new GetHallplanUseCase(hallplanMatrixService, seatTypeService, currentLocationService),
});

hallplan.get(AppRoute.ROOT, validationMiddlewareBuilder({ query: getHallplanQuerySchema }), hallplanController.get);

export { hallplan };
