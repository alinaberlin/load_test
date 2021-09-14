/*Spike test is a variation of a load test, but it does not gradually increase the load. 
instend it spikes to extreme load over a very short windiw of time

Run a stress too:

-Determine how you system will perform under a sudden surge of traffic
-Determine how you system will recover once the traffic has subsided

Success is based on expectation. System will generally react in 1 of 4 ways
-Excellent: system performance is not degarded during the surge of the traffic.
Respose time is similar during low traffic and hight traffic

-Good: Respose time is slower, but thhe ssytem does not produce any errors
Are requests are handled 
-Poor: System produces errors during the surge of traffic, but recovers to nowmal after the traffic subside
- Bad: System chrashes, and does not recover after the traffic has subsided
!!For his test scenario as demo I used a small numbers of users because i don't want to kill the API used for demonstration, normally with another API I will use a high numbers of users
*/

import { sleep } from 'k6';
import http from 'k6/http'

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        { duration: '10m', target: 2 }, // below normal load
        { duration: '1m', target: 2 },
        { duration: '10m', target: 10 }, //spike load to 10 (For his test scenario as demo I used a small numbers of users because i don't want to kill the API used for demonstration, normally with another API I will use a high numbers of users)
        { duration: '3m', target: 10 }, //stay at 10 for 3 minutes
        { duration: '5m', target: 6 }, //scale down. Recovery stage.
        {duration: '2m', target: 100},
        {duration:'10s', target:0}

    ]

}

const API_BASE_URL = 'http://openlibrary.org'

export default () => {
    http.batch([
        ['GET', `${API_BASE_URL}/search.json?q=the+lord+of+the+rings`],
    ]
    )
    sleep(1);
}