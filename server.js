/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const express2 = require('express');
const cors = require("cors");
const router = express2.Router();

const app = express();
const nem = require("nem-sdk").default;

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(cors());


async function getVehicleInfo(vin) {
    try {
        const endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);
        console.log(vin);
        const resultarr = [];
        const result = await nem.com.requests.namespace.info(endpoint, "autochainv2."+vin);
        resultarr.push(result);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        return JSON.stringify(resultarr);

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

async function getAllMosaicData(vin) {
    try {
        const endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);
        console.log(vin);
        const result = await nem.com.requests.namespace.mosaicDefinitions(endpoint, "autochainv2."+vin);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        return JSON.stringify(result.data);

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

async function ownershipTransfer(vin, prtkey, toaddr) {
    try {

      let nem = require("nem-sdk").default;
      let endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);

      //SujACwin to sujithsizon
      let common = nem.model.objects.create("common")("",prtkey);
      let transferTransaction = nem.model.objects.create("transferTransaction")(toaddr, 0, "Ownership Transfer of Vehicle with VIN:"+ vin);


      var mosaicDefinitions = nem.model.objects.get("mosaicDefinitionMetaDataPair");
      var mosaicAttachment = nem.model.objects.create("mosaicAttachment")("autochainv2."+vin, "owner", 1);
      transferTransaction.mosaics.push(mosaicAttachment);

      const res = await nem.com.requests.namespace.mosaicDefinitions(endpoint, mosaicAttachment.mosaicId.namespaceId)
        var definition = nem.utils.helpers.searchMosaicDefinitionArray(res.data, ["owner"]);
        var fullName = nem.utils.format.mosaicIdToName(mosaicAttachment.mosaicId);
        mosaicDefinitions[fullName] = {};
        mosaicDefinitions[fullName].mosaicDefinition = definition[fullName];
        var preparedTransaction = nem.model.transactions.prepare("mosaicTransferTransaction")(common, transferTransaction, mosaicDefinitions, nem.model.network.data.testnet.id);
        preparedTransaction.fee = 1000000;

        const finalresult = await nem.model.transactions.send(common, preparedTransaction, endpoint);

        const resultarr = [];
        resultarr.push(finalresult);
      console.log(`Mosaic Transfer, result is: `);
      console.log(JSON.stringify(resultarr));
      return JSON.stringify(resultarr);


    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

// app.use(express.static(path.join(__dirname, 'frontend/dist')));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
// });


app.get('/api/getVehicleInfo', (req, res) => {
  getVehicleInfo(req.query.vin).then( snapshot => {
      res.send(snapshot);
    });
});

app.get('/api/getAllMosaicData', (req, res) => {
  getAllMosaicData(req.query.vin).then( snapshot => {
      res.send(snapshot);
    });
});

app.get('/api/ownershipTransfer', (req, res) => {
  ownershipTransfer(req.query.vin, req.query.prtkey, req.query.toaddr).then( snapshot => {
      res.send(snapshot);
    });
});



app.listen(1337, () => console.log('Server started...'));
