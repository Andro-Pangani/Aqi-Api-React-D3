exports.getAqiController = async (req, res) => {
  let date = new Date();
  let currentDate = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    time: {
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
    },
  };

  // Each Month firs Day
  let dayOffset = 1;
  let fromHour = currentDate.time.hours;

  if (currentDate.day === 1) {
    console.log(currentDate, ' <-- date ');
    fromHour = 0;
    dayOffset = 0;
  }

  const apiUrl = `http://air.gov.ge/api/get_data_1hour/?from_date_time=${
    currentDate.year
  }-${currentDate.month}-${
    currentDate.day - dayOffset
  }T${fromHour}:00:00&to_date_time=${currentDate.year}-${currentDate.month}-${
    currentDate.day
  }T${
    currentDate.time.hours
  }:00:00&station_code=all&municipality_id=all&substance=all&format=json`;

  let data = await (await fetch(apiUrl)).json().catch((err) => {
    if (err) {
      console.log(err, ' <<<<<<< FROM AQI ROUTE >>>>');
      res.json({ data: null });
    }
  });

  let formatedData = [
    [{ city: 'Tbilisi', stations: [] }],
    [{ city: 'Kutaisi', stations: [] }],
    [{ city: 'Batumi', stations: [] }],
    [{ city: 'Rustavi', stations: [] }],
  ];

  data.map((city) => {
    formatedData.map((item) => {
      console.log(item[0].city == 'Tbilisi', ' - item');
      if (item[0].city === city.settlement_en) {
        item[0].stations.push(city);
      }
    });
  });

  console.log(formatedData, '<<<< formatted data');
  res.json({
    data: data,
  });
};
