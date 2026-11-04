import type { HallplanMatrix } from '../../../../common/entities/hallplan';

export type HallplanRepository = {
  getByLocationId: (locationId: number) => Promise<HallplanMatrix | undefined>;
};
