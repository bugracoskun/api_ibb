let soap = require('soap');

module.exports = {
    // Get POIs list
    getStops(data,callback){
      let url = 'https://api.ibb.gov.tr/iett/UlasimAnaVeri/HatDurakGuzergah.asmx?wsdl';
      let geojson = {"type" : "FeatureCollection",
        "features" : []
      };
      let args = {DurakKodu:'217845'};
      soap.createClient(url, function(err, client) {
        client.GetDurak_json(args, function(err, result) {
            result = JSON.parse(result.GetDurak_jsonResult);
            durak =
                result.forEach(function (e) {
                    geojson.features.push({
                        "type": "Feature",
                        "properties": {
                            "SDURAKKODU":e.SDURAKKODU,
                            "SDURAKADI":e.SDURAKADI,
                            "ILCEADI":e.ILCEADI,
                            "SYON":e.SYON,
                            "AKILLI":e.AKILLI,
                            "FIZIKI":e.FIZIKI,
                            "DURAK_TIPI":e.DURAK_TIPI,
                        },
                        "geometry": {
                            "type":"Point",
                            "coordinates": JSON.parse(e.KOORDINAT.replace("POINT ", "").replace(" ", ",").replace("(","[").replace(")","]"))
                        }
                    });
                });
            callback({status:true,message:"Poi List",data:geojson});
        });
      });
            
      //
    }

}