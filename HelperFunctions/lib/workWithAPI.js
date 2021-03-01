import { mainDataReducer } from '../../components/Redux/src/dataSlices';

export const ApiHandler = (data) => {
  let mainData = {
    active_city: null,
    active_station: null,
    active_substance: null,
    cities: {
      Tbilisi: {
        id: 51,
        empty: true,
        active_station: null,
        stations: [],
      },
      Rustavi: {
        id: 55,
        empty: true,
        active_station: null,
        stations: [],
      },
      Batumi: {
        id: 52,
        empty: true,
        active_station: null,
        stations: [],
      },
      Kutaisi: {
        id: 54,
        empty: true,
        active_station: null,
        stations: [],
      },
    },

    stations: [],
  };

  // * marker for city
  let station_empty_outer = true;

  // * maker for City's active station
  // * to highlight in *UI
  let active_station_set = false;

  let checkedData = data.map((station) => {
    // * marker for station
    let station_empty_inner = true;

    station.stationequipment_set.map((item) => {
      if (item?.data1hour_set?.length == 0 || item?.data1hour_set == null) {
        item.empty = true;
      } else {
        station_empty_inner = false;
        item.empty = false;

        // if even once we go here
        // that means city isn't empty ;)
        station_empty_outer = false;
      }

      return item;
    });

    let cityName = station.settlement_en;
    let cityStations = mainData.cities[cityName].stations;

    // If any station in city isn't empty
    // City isn't empty
    if (mainData.cities[cityName].empty === true) {
      // if station isn't empty
      if (station_empty_inner === false) {
        // If City doesn't have yet active station
        if (!mainData.cities[cityName].active_station) {
          // set first not empty station to city active station
          mainData.cities[cityName].active_station = station.id;
        }

        // City isn't empty
        mainData.cities[cityName].empty = false;
        // refresh inner marker
        station_empty_inner = true;
      }
    }

    station.empty = station_empty_outer;

    // add city stations
    mainData.cities[cityName].stations = [
      ...cityStations,
      {
        id: station.id,
        address: station.address_en,
        substances: station.stationequipment_set,
      },
    ];

    // refreshing City marker
    station_empty_outer = true;

    return station;
  });

  mainData.stations = checkedData;

  // Here we set Active City for UI
  // To highlight when data is loaded
  let active_city_set = false;
  let { cities } = mainData;
  Object.keys(cities).map((city) => {
    if (!active_city_set) {
      if (!cities[city].empty) {
        console.log(cities[city], '{{{{{{{{{{{{{{{active city}}}}}}}}}}}}}}}');
        mainData.active_city = cities[city].id;
        mainData.active_station = cities[city].active_station;
        let active_station_id = cities[city].active_station;

        for (let i = 0; i < data.length; i++) {
          let station = data[i];
          if (station.id === active_station_id) {
            console.log('################ active station ', station);
            let equipment = station.stationequipment_set;
            for (let i = 0; i < equipment.length; i++) {
              if (!equipment[i].empty) {
                mainData.active_substance = equipment[i];
                break;
              }
            }
            break;
          }
        }
      }
      active_city_set = true;
    }
  });

  console.log(checkedData, mainData, ' <<<<<<<< Checked data');

  return mainData;
};
