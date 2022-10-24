const express = require('express');
const jobsRouter = express.Router();

const axios = require('axios');
//const jwt = require('jsonwebtoken');

const url = 'https://rest.arbeitsagentur.de/oauth/gettoken_cc';
const url1 = 'https://rest.arbeitsagentur.de/jobboerse/jobsuche-service/pc/v4/jobs';
let token = '';

const creds = {
    grant_type: 'client_credentials',
    client_id: 'c003a37f-024f-462a-b36d-b001be4cd24a',
    client_secret: '32a39620-32b3-4307-9aa1-511e3d7f48a8'
};

const generateToken = async (req, res, next) => {
  try {  
    console.log("Generating token......");
    const {data: {access_token}} = await axios.post(url, creds, {
      headers: {
        'User-Agent': 'Jobsuche/2.9.2 (de.arbeitsagentur.jobboerse; build:1077; iOS 15.1.0) Alamofire/5.4.4',
        'Host': 'rest.arbeitsagentur.de',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      }
    });
    token = access_token;
    next();
  } catch(error) {
    res.status(500).json({error: error.message});
  }
}

jobsRouter.use(generateToken);

jobsRouter.get('/', async (req, res) => {
  try { 
    const {params: {what, where}} = req;
    const { data } = await axios.get(url1, {
      headers: {'OAuthAccessToken': token}, 
      params: { 
        'angebotsart': '1',
        'page': '1',
        'pav': 'false',
        'size': '100',
        'umkreis': '50',
        'was': what,
        'wo': where
      }
    });

    res.status(200).json(data.stellenangebote);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = jobsRouter;