import { FETCH_FLIGHTS, POST_FLIGHT, DELETE_FLIGHT, SEARCH_FLIGHT, UPDATE_FLIGHT } from "../actions/types";

export const fetchFlights = () => dispatch => {
    fetch("http://localhost:7003/flights/getflights")
        .then((response) =>
            response.json().catch((err) => {
                console.err(`'${err}' happened!`);
                return {};
            })
        )
        .then((flightData) => {
            dispatch({
                type: FETCH_FLIGHTS,
                payload: flightData
            })
        })
        .catch((err) => {
            console.log("fetch request failed: ", err);
        });
};

export const addflight = (postData, id) => dispatch => {
    fetch("http://localhost:7003/flights/addflight/", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + id
        },
        body: JSON.stringify(postData),
    })
        .then((res) => res.json())
        .then((rems) => {
            dispatch({
                type: POST_FLIGHT,
                payload: rems
            })
        })
        .catch(err => {
            alert(`error occured : ${err}`);
            window.location.reload();
        })
};


export const deleteFlight = (flight, id) => dispatch => {
    fetch("http://localhost:7003/flights/" + flight.flightId, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + id
        }
    })
        .then(data => data.json())
        .then((dat) => {
            console.log(dat);
            dispatch({
                type: DELETE_FLIGHT,
                payload: dat
            })
        })
        .catch((err) => {
            console.log(err);
        })
};



