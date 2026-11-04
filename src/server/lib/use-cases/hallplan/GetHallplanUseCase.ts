import type { HallplanResponse } from '../../../../common/entities/hallplan';
import type { CurrentLocationService } from '../../../services/current-location/CurrentLocationService';
import { Hall } from '../../entities/hallplan/Hall';
import { mapSeatsToSeatData } from '../../entities/hallplan/helpers';
import { HallplanNotFoundError } from '../../errors/hallplan/HallplanError';
import type { HallplanRepository } from '../../ports/hallplan/HallplanRepository';
import type { SeatTypeRepository } from '../../ports/hallplan/SeatTypeRepository';

type GetHallplanCommand = {
  locationId?: number;
};

export class GetHallplanUseCase {
  #hallplans: HallplanRepository;
  #seatTypes: SeatTypeRepository;
  #currentLocation: CurrentLocationService;

  constructor(hallplans: HallplanRepository, seatTypes: SeatTypeRepository, currentLocation: CurrentLocationService) {
    this.#hallplans = hallplans;
    this.#seatTypes = seatTypes;
    this.#currentLocation = currentLocation;
  }

  async execute(command: GetHallplanCommand = {}): Promise<HallplanResponse> {
    const locationId = await this.resolveLocationId(command.locationId);

    if (!locationId) {
      throw new HallplanNotFoundError('Location is not selected');
    }

    const hallplan = await this.#hallplans.getByLocationId(locationId);

    if (!hallplan) {
      throw new HallplanNotFoundError();
    }

    const seatTypes = await this.#seatTypes.getAll();
    const hall = new Hall({ hallPlanMatrix: hallplan.matrix });

    return {
      seats: mapSeatsToSeatData(hall.createSeats(), seatTypes),
      canvas: hall.getCanvasSize(),
      seatTypes,
    };
  }

  private async resolveLocationId(locationId?: number) {
    if (locationId && locationId > 0) {
      return locationId;
    }

    const currentLocation = await this.#currentLocation.getOne();

    if (!currentLocation || currentLocation.id <= 0) {
      return undefined;
    }

    return currentLocation.id;
  }
}
