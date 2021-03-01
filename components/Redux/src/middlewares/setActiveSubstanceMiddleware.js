import { setActiveSubstance } from '../dataSlices';

export const SetActiveSubstanceMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'aqi_data/setActiveStation':
      let stations = store.getState().data.aqi_data?.stations;
      let activeStationId = action.payload;
      let activeSubstance = null;
      if (stations)
        for (let i = 0; i < stations.length; i++) {
          let station = stations[i];
          if (station.id === activeStationId) {
            let equipments = station.stationequipment_set;
            for (let j = 0; j < equipments.length; j++) {
              if (!equipments[j].empty) {
                activeSubstance = equipments[j];
                store.dispatch(setActiveSubstance(activeSubstance));
                break;
              }
            }
            break;
          }
        }

      console.log(
        stations,
        action.payload,
        activeSubstance,
        '########### Stations from middleware'
      );

      break;
    default:
      break;
  }

  return next(action);
};
