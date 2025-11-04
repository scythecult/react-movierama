// TODO Read about query keys semantic-naming
// TODO Use AppRoute.key as query key
export const QueryKey = {
  hallplan: {
    all: ['hallplan'] as const,
    canvas: ['hallplan', 'canvas'] as const,
    seats: ['hallplan', 'seats'] as const,
    seatTypes: ['hallplan', 'seatTypes'] as const,
  },
};
