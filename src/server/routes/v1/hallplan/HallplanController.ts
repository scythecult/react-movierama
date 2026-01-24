// У нас есть сущность Hall, по сути точка входа

// Вначале сессии определяется гео, далее оно добавляется в хедеры каждого запроса (Location-id: {id})

// В ЛОБ: Мы передаём сервис геопозиции в определённые контроллеры, дёргаем ручку сервиса гео, получаем гео
// на основе гео ищем в БД текущий план-театра, сеансы, всё что зависит от гео
import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SeatSizeOption } from '../../../lib/constants/seats';
import { Hall } from '../../../services/Hall';
import type { HallplanMatrixService } from '../../../services/hallplan-matrix/HallplanMatrixService';
import type { SeatTypeService } from '../../../services/seat-type/SeatTypeService';
import { SeatNode } from '../../../services/SeatNode';

export class HallplanController {
  #hallplanMatrixService;
  #seatTypeService;

  constructor(hallplanMatrixService: HallplanMatrixService, seatTypeService: SeatTypeService) {
    this.#hallplanMatrixService = hallplanMatrixService;
    this.#seatTypeService = seatTypeService;
  }

  getHallplan = async (request: Request, response: Response) => {
    const { locationId = 20 } = request.body || {};
    const { matrix } = (await this.#hallplanMatrixService.getOne(locationId))!;
    const seatTypes = await this.#seatTypeService.getAll();

    const hall = new Hall({
      Seat: SeatNode,
      hallPlanMatrix: matrix,
      seatWidth: SeatSizeOption.WIDTH,
      seatHeight: SeatSizeOption.HEIGHT,
      seatOffset: SeatSizeOption.OFFSET,
    });
    const rawSeats = hall.createSeats();
    const canvas = hall.getCanvasSize();
    const seats = Hall.convertRawSeatsToData(rawSeats, seatTypes);

    return response.status(StatusCodes.OK).json({
      data: {
        seats,
        canvas,
        seatTypes,
      },
    });
  };
}
