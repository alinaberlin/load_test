/* Load Testing is primarily concernd with assessing the current performace of you system 
in terms of concurrent users or request per second.
When you want to understand if your system is meeting the performace goals, this is the type of test you'll run.
Should be regularly executed.


Run a load test to:
-Assess the current performance of your system under typical and peak load, how many users can be handled
-Is the test which should be runned first to get the benchmark and how far you can push your systems in others test: spyke and stress. Also the benchmark can offer information about how the system is handling
the API requests, making possible to differentiate between diffent commits 
-In terms of continuous integration also can reveal how the system perform, if the system gets slow or fast
-Make sure you are continuously meeting the performance standars as you make changes to your system



Can be used to stimulate a normal day in your business

*/

import { sleep } from 'k6';
import http from 'k6/http'

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        { duration: '5m', target: 5 }, // stimulate ramp-up of trafic from 1 to 5 of users over 5 minutes
        { duration: '10m', target: 10 }, //stay at 10 users for 10 minutes
        { duration: '50m', target: 0 }, // rapm-down to 0 users
    ],

    thresholds: {
        http_req_duration: ['p(98)< 2000'] // 98% of requests must be completed within 2 s
    }

}

const API_BASE_URL = 'http://openlibrary.org'

export default () => {
    http.batch([
        ['GET', `${API_BASE_URL}/search.json?q=the+lord+of+the+rings`],
    ]
    )
    sleep(1);
}