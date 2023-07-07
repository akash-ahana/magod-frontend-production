const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const axios = require('axios');
const { baseURL } = require('./api/baseUrl');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/setProduction', (req, res) => {
  // Retrieve the machine logbook data from the request body
  const machineLogBook = req.body.machineLogBook;

  // Step 1: Calculate production time
  const productionTime = machineLogBook
    .filter((log) => !log.isFromTimeNull && !log.isToTimeNull && log.taskNo !== '100')
    .reduce((groups, log) => {
      const machine = log.machine;
      const timeDiff = Math.floor((new Date(log.toTime) - new Date(log.fromTime)) / 60000); // Time difference in minutes

      if (!groups[machine]) {
        groups[machine] = { machineList: [log], prodTime: timeDiff };
      } else {
        groups[machine].machineList.push(log);
        groups[machine].prodTime += timeDiff;
      }

      return groups;
    }, {});

  // Step 2: Set ProdON and TotalOn to default values in the machine_utilisationsummary table
  const machineUtilisationSummary = req.body.machineUtilisationSummary;
  machineUtilisationSummary.forEach((row) => {
    row.prodON = 0;
    row.totalOn = 1440;
  });

  // Step 3: Update ProdON and NonProdOn in the machine_utilisationsummary table based on productionTime
  Object.entries(productionTime).forEach(([machine, machTime]) => {
    const matchingRow = machineUtilisationSummary.find((row) => row.machine === machine);

    if (matchingRow) {
      matchingRow.prodON = machTime.prodTime;
      matchingRow.nonProdOn = matchingRow.totalOn - machTime.prodTime;
    }
  });

  // Step 4: Save updated machine_utilisationsummary data using an API endpoint
  axios
    .post(baseURL + '/saveMachineUtilisationSummary', {
      machineUtilisationSummary: machineUtilisationSummary,
    })
    .then((response) => {
      // Handle successful response from the API
      console.log(response.data);
      res.status(200).json({ message: 'Machine utilization summary updated successfully.' });
    })
    .catch((error) => {
      // Handle error response from the API
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating machine utilization summary.' });
    });
});

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});


///////////////////////////////////////////////////////////////////////////////////////////
