import { FETCH_FLIGHTS, POST_FLIGHT, UPDATE_FLIGHT, SEARCH_FLIGHT, DELETE_FLIGHT } from "../actions/types";

const initialState = {
    flights: [],
    bookings: [],
    flight: {},
    booking: {},
    delete: {}

};

export default function (state = initialState, action) {

    switch (action.type) {
        case FETCH_FLIGHTS:
            return {
                ...state,
                flights: action.payload
            };

        case POST_FLIGHT:
            return {
                ...state,
                flight: action.payload
            };

        case DELETE_FLIGHT:
            return {
                ...state,
                delete: action.payload
            }
        default:
            return state;
    }
}
