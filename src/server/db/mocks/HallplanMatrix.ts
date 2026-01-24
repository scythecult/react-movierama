import type { HallplanMatrix } from '../../../common/types/hallplan-matrix';

export class MockHallplanMatrixDb {
  #hallplanMatrixes: HallplanMatrix[];
  constructor(hallplanMatrixes: HallplanMatrix[]) {
    this.#hallplanMatrixes = hallplanMatrixes;
  }

  async findUnique(id: number) {
    return this.#hallplanMatrixes.find((hallplanMatrix) => hallplanMatrix.id === id);
  }
}
