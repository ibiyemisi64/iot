/********************************************************************************/
/*										*/
/*		server.js							*/
/*										*/
/*	 Main server code of Catre External Device Environment Server		*/
/*										*/
/********************************************************************************/
"use strict";

const http = require('http');
const https = require('https');

const express = require('express');

const logger = require('morgan');
const bodyparser = require('body-parser');
const bearerToken = require('express-bearer-token');

const config = require("./config");
const catre = require("./catre");
const generic = require("./generic");
const iqsign = require("./iqsign");
const smartthings = require("./smartthings");



/********************************************************************************/
/*										*/
/*	Module storage								*/
/*										*/
/********************************************************************************/

const bearer_token = config.randomString(24);



/********************************************************************************/
/*										*/
/*	Express setup								*/
/*										*/
/********************************************************************************/

function setup()
{
    const app = express();

    const iqsignrouter = iqsign.getRouter(express.Router());
    const genericrouter = generic.getRouter(express.Router());
    const smartthingsrouter = smartthings.getRouter(express.Router());

    app.use(logger('combined'));

    app.use(bodyparser.urlencoded({ extended: true } ));
    app.use(bodyparser.json());
    app.use(bearerToken());

    if (iqsign != null) app.all('/iqsign/*',iqsignrouter);
    if (generic != null) app.all('/generic/*',genericrouter);
    if (smartthings != null) app.all('/smartthings/*',smartthingsrouter);

    app.all("/catre/setup",handleSetup);

    app.all("/catre/*",authenticate);
    app.post("/catre/addbridge",addBridge);
    app.post("/catre/command",bridgeCommand);

    app.all('*',config.handle404);
    app.use(config.handleError);

    try {
	const httpsserver = https.createServer(config.getHttpsCredentials(),app);
	httpsserver.listen(config.HTTPS_PORT);
	console.log(`HTTPS Server listening on port ${config.HTTPS_PORT}`);
     }
    catch (error) {
	console.log("Did not launch https server",error);
     }
}



/********************************************************************************/
/*										*/
/*	Authenticate for general messages from CATRE server			*/
/*										*/
/********************************************************************************/

function authenticate(req,res,next)
{
   next();
}


/********************************************************************************/
/*										*/
/*	Catre commands								*/
/*										*/
/********************************************************************************/

/**
 *	addBridge { bridge: NAME, id: ID, authdata: {...} }
 **/

async function addBridge(req,res)
{
   console.log("CATRE ADD BRIDGE",req.body);

   let succ = false;

   switch (req.body.bridge) {
      case "generic" :
	 succ = generic.addBridge(req.body.authdata,req.body.bridgeid);
	 break;
      case "smarrthings" :
	 succ = smartthings.addBridge(req.body.authdata,req.body.bridgeid);
	 break;
      case "iqsign" :
	 succ = iqsign.addBridge(req.body.authdata,req.body.bridgeid);
	 break
      default :
	 config.handleFail(req,res,"No such bridge");
	 return;
    }

   if (succ) config.handleSuccess(req,res);
   else config.handleFail(req,res,"Bad authentication");
}



/**
 *	COMMAND { bridge: NAME, id: ID, uid: USER, command: {..} }
 **/

async function bridgeCommand(req,res)
{
   console.log("CATRE BRIDGE COMMAND",req.body);

   let succ = null;

   switch (req.body.bridge) {
      case "generic" :
	 succ = generic.handleCommand(req.body.id,req.body.uid,req.body.command);
	 break;
      case "smarrthings" :
	 succ = smartthings.handleCommand(req.body.id,req.body.uid,req.body.command);
	 break;
      case "iqsign" :
	 succ = iqsign.addCommand(req.body.id,req.body.uid,req.body.command);
	 break
      default :
	 config.handleFail(req,res,"No such bridge");
	 return;
    }

   config.handleSuccess(req,res,succ);
}



/********************************************************************************/
/*										*/
/*	Handle setup								*/
/*										*/
/********************************************************************************/

async function handleSetup(req,res)
{
   setupCatre();

   config.handleSuccess(req,res);
}


async function setupCatre()
{
   await catre.sendToCatre({command: "INITIALIZE", auth: bearer_token });
}



/********************************************************************************/
/*										*/
/*	Main routine								*/
/*										*/
/********************************************************************************/

setup();

setupCatre();




/********************************************************************************/
/*										*/
/*	Exports 								*/
/*										*/
/********************************************************************************/



/* end of server.js */

