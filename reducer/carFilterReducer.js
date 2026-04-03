export const initialState = {
  price: [0, 130000],
  km: [0, 170000],
  year: [2015, 2025],
  make: "Any Make",
  model: "Any Model",
  transmission: "Any Transmission",
  color: "Any Color",
  filtered: [],
  sortingOption: "Sort by (Default)",
  sorted: [],
  currentPage: 1,
  itemPerPage: 6,
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_PRICE":
      return { ...state, price: action.payload };
    case "SET_YEAR":
      return { ...state, year: action.payload };
    case "SET_KM":
      return { ...state, km: action.payload };
    case "SET_MODEL":
      return { ...state, model: action.payload };
    case "SET_MAKE":
      return { ...state, make: action.payload };
    case "SET_TRANSMISSION":
      return { ...state, transmission: action.payload };
    case "SET_COLOR":
      return { ...state, color: action.payload };
    case "SET_FILTERED":
      return { ...state, filtered: [...action.payload] };
    case "SET_SORTING_OPTION":
      return { ...state, sortingOption: action.payload };
    case "SET_SORTED":
      return { ...state, sorted: [...action.payload] };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_ITEM_PER_PAGE":
      return { ...state, itemPerPage: action.payload };
    case "CLEAR_FILTER":
      return {
        ...state,
        price: [0, 130000],
        km: [0, 170000],
        year: [2015, 2025],
        make: "Any Make",
        model: "Any Model",
        transmission: "Any Transmission",
        color: "Any Color",
      };
    default:
      return state;
  }
}
