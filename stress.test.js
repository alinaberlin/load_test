/*Test Testing is a type of a load testing used to determine the limits of the system 
The purpose of this test is to very the stability and reability of the system user extreme considtions

Fun a stress test to:
-Determine how you system will begave under extrem condition
-Determine what is the maxim capacity of your system in terms of users or throughput
-Determine the breaking point of you sistem and its failure mode 
-Determine of your system will recover witout manual intervention after the stress is over

More than a load test than a spike test */


import { sleep } from 'k6';
import http from 'k6/http'

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        { duration: '2m', target: 2 }, //below normal load
        { duration: '5m', target: 2 },
        { duration: '2m', target: 4 }, //normal load 
        { duration: '5m', target: 4 },
        { duration: '5m', target: 6 },


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