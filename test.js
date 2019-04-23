var nem = require('nem-sdk').default;

var endpoint = nem.model.objects.create('endpoint')(
  nem.model.nodes.defaultTestnet, // Change to "defaultMainnet"
  nem.model.nodes.defaultPort
);

// Create a common object holding key (password and private key is required)


var methods = {
  mosaicTransfer: function(vin, prtkey, toaddr) {
    var common = nem.model.objects.create('common')('', prtkey); // Change your password and privatekey
    var mosaicDefinitionMetaDataPair = nem.model.objects.get('mosaicDefinitionMetaDataPair');

    // MOSAIC Tranfer use 1 XEM
    var transferTransaction = nem.model.objects.create('transferTransaction')(toaddr,1,'');

    // Create a mosaic attachment object
    var mosaicAttachment = nem.model.objects.create('mosaicAttachment')(
      "autochainv2."+vin, // namespace required
      'owner', // masaicName required
      1
    );

    // Push attachment into transaction mosaics
    transferTransaction.mosaics.push(mosaicAttachment);

    nem.com.requests.namespace.mosaicDefinitions(endpoint, mosaicAttachment.mosaicId.namespaceId).then(
        function(res) {
          var neededDefinition = nem.utils.helpers.searchMosaicDefinitionArray(
            res.data,
            ['owner'] // masaicName required
          );

          // Get full name of mosaic to use as object key
          var fullMosaicName = nem.utils.format.mosaicIdToName(
            mosaicAttachment.mosaicId
          );

          // Check if the mosaic was found
          if (undefined === neededDefinition[fullMosaicName])
            return console.error('Mosaic not found !');

          // Set eur mosaic definition into mosaicDefinitionMetaDataPair
          mosaicDefinitionMetaDataPair[fullMosaicName] = {};
          mosaicDefinitionMetaDataPair[fullMosaicName].mosaicDefinition =
            neededDefinition[fullMosaicName];

          // Prepare the transfer transaction object
          var transactionEntity = nem.model.transactions.prepare(
            'mosaicTransferTransaction'
          )(
            common,
            transferTransaction,
            mosaicDefinitionMetaDataPair,
            nem.model.network.data.testnet.id
          );

          // Serialize transfer transaction and announce
          nem.model.transactions.send(common, transactionEntity, endpoint);
        },
        function(err) {
          console.error(err);
        }
      );
  },
};

exports.data = methods;
