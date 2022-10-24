const axios = require('axios');
const jwt = require('jsonwebtoken');

const url = 'https://rest.arbeitsagentur.de/oauth/gettoken_cc';
const url1 = 'https://rest.arbeitsagentur.de/jobboerse/jobsuche-service/pc/v4/jobs';
let isAuthenticated = false;

// POST- request
const data = {
    grant_type: 'client_credentials',
    client_id: 'c003a37f-024f-462a-b36d-b001be4cd24a',
    client_secret: '32a39620-32b3-4307-9aa1-511e3d7f48a8'
};


const generateToken = async () => {
    console.log("Generating token......");
    const response = await axios(url, {
        method: 'POST',
        Headers: {
            'User-Agent': 'Jobsuche/2.9.2 (de.arbeitsagentur.jobboerse; build:1077; iOS 15.1.0) Alamofire/5.4.4',
                        'Host': 'rest.arbeitsagentur.de',
                        'Connection': 'keep-alive',
                        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                        },
        body: {
            'client_id': 'c003a37f-024f-462a-b36d-b001be4cd24a',
            'client_secret': '32a39620-32b3-4307-9aa1-511e3d7f48a8',
            'grant_type': 'client_credentials'
        }
    });
        const data = await response.json();
        const token = data.access_token;
        console.log("Token: " + data.access_token);
}

const searchJobs = async (accessToken, what, where) => {
    console.log("Searching Jobs......");
    const headers = {
            'User-Agent': 'Jobsuche/2.9.2 (de.arbeitsagentur.jobboerse; build:1077; iOS 15.1.0) Alamofire/5.4.4',
            'Host': 'rest.arbeitsagentur.de',
            'OAuthAccessToken': accessToken,
            'Connection': 'keep-alive',
        };
    const params = {
        'angebotsart': '1',
            'page': '1',
            'pav': 'false',
            'size': '100',
            'umkreis': '50',
            'was': what,
            'wo': where
    };

    const { response } = await axios.get(url1, headers, params, verify= false);
    const data = await response.json();
    setToken(data.access_token);
    // console.log(data);
}


// const setToken = (accessToken) => {
//     console.log("Setting token...");
//     token = jwt.sign(accessToken);
//     console.log("Token: " + token);
//     isAuthenticated = true;
//     return token;
// };




if (!isAuthenticated) {
    const token = generateToken();
    const result = searchJobs(token, 'pflege', 'Berlin');
    console.log(result['stellenangebote']);
}else{
    const result = searchJobs(token, 'pflege', 'Berlin');
    console.log(result);
}
    


// module.exports = {  generateToken  };








