const core = require('@actions/core');
const axios = require('axios');

async function run() {
  try {
    // Retrieve the inputs defined in action.yml
    const functionUrl = core.getInput('function-url');
    const functionkey = core.getInput('function-key');
    
    console.log(`Fetching data from URL: ${functionUrl}`);
    
    // Make the HTTP GET request to the Azure Function with the function key in the headers
    const response = await axios.get(functionUrl, {
      headers: {
        'function-key': functionKey
      }
    });
    
    // Extract the data from the response
    const currentDateTime = response.data;
    console.log(`Response data: ${currentDateTime}`);
    
    // Set the output for the GitHub Action
    core.setOutput('currentDateTime', currentDateTime);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
