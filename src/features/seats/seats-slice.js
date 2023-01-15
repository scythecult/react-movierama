import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seatsData: [
    [
      { id: "200", isSelected: false, isOccupied: false },
      { id: "201", isSelected: false, isOccupied: false },
      { id: "202", isSelected: false, isOccupied: false },
      { id: "203", isSelected: false, isOccupied: false },
      { id: "204", isSelected: false, isOccupied: false },
      { id: "205", isSelected: false, isOccupied: false },
      { id: "206", isSelected: false, isOccupied: false },
      { id: "207", isSelected: false, isOccupied: false },
      { id: "208", isSelected: false, isOccupied: false },
      { id: "209", isSelected: false, isOccupied: false },
      { id: "2010", isSelected: false, isOccupied: true },
      { id: "2011", isSelected: false, isOccupied: true },
      { id: "2012", isSelected: false, isOccupied: false },
      { id: "2013", isSelected: false, isOccupied: false },
    ],
    [
      { id: "300", isSelected: false, isOccupied: false },
      { id: "301", isSelected: false, isOccupied: false },
      { id: "302", isSelected: false, isOccupied: false },
      { id: "303", isSelected: false, isOccupied: false },
      { id: "304", isSelected: false, isOccupied: false },
      { id: "305", isSelected: false, isOccupied: false },
      { id: "306", isSelected: false, isOccupied: false },
      { id: "307", isSelected: false, isOccupied: false },
      { id: "308", isSelected: false, isOccupied: false },
      { id: "309", isSelected: false, isOccupied: false },
      { id: "3010", isSelected: false, isOccupied: false },
      { id: "3011", isSelected: false, isOccupied: false },
      { id: "3012", isSelected: false, isOccupied: false },
      { id: "3013", isSelected: false, isOccupied: false },
    ],
    [
      { id: "400", isSelected: false, isOccupied: false },
      { id: "401", isSelected: false, isOccupied: false },
      { id: "402", isSelected: false, isOccupied: false },
      { id: "403", isSelected: false, isOccupied: false },
      { id: "404", isSelected: false, isOccupied: false },
      { id: "405", isSelected: false, isOccupied: true },
      { id: "406", isSelected: false, isOccupied: true },
      { id: "407", isSelected: false, isOccupied: false },
      { id: "408", isSelected: false, isOccupied: false },
      { id: "409", isSelected: false, isOccupied: false },
      { id: "4010", isSelected: false, isOccupied: false },
      { id: "4011", isSelected: false, isOccupied: false },
      { id: "4012", isSelected: false, isOccupied: false },
      { id: "4013", isSelected: false, isOccupied: false },
    ],
    [
      { id: "500", isSelected: false, isOccupied: true },
      { id: "501", isSelected: false, isOccupied: false },
      { id: "502", isSelected: false, isOccupied: false },
      { id: "503", isSelected: false, isOccupied: false },
      { id: "504", isSelected: false, isOccupied: false },
      { id: "505", isSelected: false, isOccupied: false },
      { id: "506", isSelected: false, isOccupied: false },
      { id: "507", isSelected: false, isOccupied: false },
      { id: "508", isSelected: false, isOccupied: false },
      { id: "509", isSelected: false, isOccupied: false },
      { id: "5010", isSelected: false, isOccupied: false },
      { id: "5011", isSelected: false, isOccupied: false },
      { id: "5012", isSelected: false, isOccupied: false },
      { id: "5013", isSelected: false, isOccupied: false },
    ],
    [
      { id: "600", isSelected: false, isOccupied: false },
      { id: "601", isSelected: false, isOccupied: false },
      { id: "602", isSelected: false, isOccupied: false },
      { id: "603", isSelected: false, isOccupied: false },
      { id: "604", isSelected: false, isOccupied: true },
      { id: "605", isSelected: false, isOccupied: false },
      { id: "606", isSelected: false, isOccupied: false },
      { id: "607", isSelected: false, isOccupied: false },
      { id: "608", isSelected: false, isOccupied: false },
      { id: "609", isSelected: false, isOccupied: false },
      { id: "6010", isSelected: false, isOccupied: false },
      { id: "6011", isSelected: false, isOccupied: false },
      { id: "6012", isSelected: false, isOccupied: false },
      { id: "6013", isSelected: false, isOccupied: false },
    ],
  ],
};

const seatsSlice = createSlice({
  name: "seats",
  initialState,
  reducers: {
    toggleActive(state, action) {
      const nextState = state.seatsData.map((item) => {
        const targetIndex = item.findIndex((innerItem) => innerItem.id === action.payload.id);

        if (targetIndex !== -1) {
          item[targetIndex] = { ...item[targetIndex], isSelected: !item[targetIndex].isSelected };

          return item[targetIndex];
        }

        return item;
      });

      state.seats = nextState;
    },
  },
});

const seatsReducer = seatsSlice.reducer;
const { toggleActive } = seatsSlice.actions;

export { seatsReducer, toggleActive };
