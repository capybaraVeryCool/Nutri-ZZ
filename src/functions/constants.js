



const dataFrame = {
  sumCal : 0,
  sumFat : 0,
  sumProtein : 0,
  sumCarb : 0,
  sumBurnt : 0,
  meals: {
    breakfast: {
      sumCal : 0,
      sumFat : 0,
      sumProtein : 0,
      sumCarb : 0,
      foods: [],
      nutrients: nutritionFrame,
    },
    lunch: {
      sumCal : 0,
      sumFat : 0,
      sumProtein : 0,
      sumCarb : 0,
      foods: [],
      nutrients: nutritionFrame,
    },
    dinner: {
      sumCal : 0,
      sumFat : 0,
      sumProtein : 0,
      sumCarb : 0,
      foods: [],
      nutrients: nutritionFrame,
    },
    snacks: {
      sumCal : 0,
      sumFat : 0,
      sumProtein : 0,
      sumCarb : 0,
      foods: [],
      nutrients: nutritionFrame,
    },
  },
  nutrients: nutritionFrame,
};




const defaultConfigure = {
    goalCal: 1800,
    goalFat: 50,
    goalProtein: 80,
    goalCarb: 200,
}


// TODO: make constant for user config

export {foodFrame, defaultConfigure};