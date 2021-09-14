/*
  Soak testing is used to validate reliability of the system over a long time
  Run a soak test to:
  - Verify that your system doesn't suffer from memory leaks or bugs
  - Find bugs related to race-conditions that appear sporadically
  - Make sure your database doesn't consume the entire processor and memory capacity
  
  How to run a soak test:
  - Determine the maximum amount of users your system cab handle
  - Get 74-80% of that value
  - Set VUs to that value
  - Run the test in 3 stages. Ramp up to the max number of desired VUs, stay there for 4-12 hours, ramp down to 0

 */

import { sleep } from 'k6'
import http from 'k6/http'

export const options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        { duration: '2m', target: 5 }, // stimulate ramp-up of trafic from 1 to 5 of users over 5 minutes
        { duration: '4h', target: 20 }, //stay at 10 users for 10 minutes
        { duration: '2m', target: 0 }, // rapm-down to 0 users
    ],
}

const API_BASE_URL = 'http://openlibrary.org'

export default () => {
    http.batch([
        ['GET', `${API_BASE_URL}/search.json?q=the+lord+of+the+rings`],
    ])
    sleep(1);
}