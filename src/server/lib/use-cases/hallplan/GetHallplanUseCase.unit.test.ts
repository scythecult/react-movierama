import type { SeatType } from '../../../../common/entities/hallplan';
import { TEST_ASTRAKHAN_LOCATION } from '../../../../tests/unit/helpers';
import type { CurrentLocationService } from '../../../services/current-location/CurrentLocationService';
import { HallplanNotFoundError } from '../../errors/hallplan/HallplanError';
import type { HallplanRepository } from '../../ports/hallplan/HallplanRepository';
import type { SeatTypeRepository } from '../../ports/hallplan/SeatTypeRepository';
import { GetHallplanUseCase } from './GetHallplanUseCase';

const seatTypes: SeatType[] = [
  {
    id: 1,
    name: 'regular',
    ticketTypes: [
      { id: 1, name: 'adult', price: 330 },
      { id: 2, name: 'child', price: 165 },
    ],
  },
];

describe('GetHallplanUseCase', () => {
  const getByLocationId = vi.fn();
  const getAll = vi.fn();
  const getOne = vi.fn();
  const hallplans = { getByLocationId } as unknown as HallplanRepository;
  const seatTypeRepository = { getAll } as unknown as SeatTypeRepository;
  const currentLocation = { getOne } as unknown as CurrentLocationService;
  const useCase = new GetHallplanUseCase(hallplans, seatTypeRepository, currentLocation);

  beforeEach(() => {
    getByLocationId.mockReset();
    getAll.mockReset();
    getOne.mockReset();
    getAll.mockResolvedValue(seatTypes);
  });

  test('should build a priced hallplan for an explicit location', async () => {
    getByLocationId.mockResolvedValue({ id: 20, matrix: [[1, 0, 1]] });

    const hallplan = await useCase.execute({ locationId: 20 });

    expect(getOne).not.toHaveBeenCalled();
    expect(getByLocationId).toHaveBeenCalledWith(20);
    expect(hallplan.seatTypes).toEqual(seatTypes);
    expect(hallplan.seats).toHaveLength(2);
    expect(hallplan.seats[0]).toMatchObject({
      id: 1001,
      price: 330,
      ticketTypeId: 1,
      seatType: seatTypes[0],
    });
    expect(hallplan.canvas.width).toBeGreaterThan(0);
    expect(hallplan.canvas.height).toBeGreaterThan(0);
  });

  test('should use the current location when the request does not name one', async () => {
    getOne.mockResolvedValue(TEST_ASTRAKHAN_LOCATION);
    getByLocationId.mockResolvedValue({ id: 23, matrix: [[1]] });

    await useCase.execute();

    expect(getOne).toHaveBeenCalledOnce();
    expect(getByLocationId).toHaveBeenCalledWith(23);
  });

  test('should throw when no location is selected', async () => {
    getOne.mockResolvedValue(null);

    await expect(useCase.execute()).rejects.toBeInstanceOf(HallplanNotFoundError);
    expect(getByLocationId).not.toHaveBeenCalled();
  });

  test('should throw when the location has no hallplan', async () => {
    getByLocationId.mockResolvedValue(undefined);

    await expect(useCase.execute({ locationId: 99 })).rejects.toBeInstanceOf(HallplanNotFoundError);
  });
});
