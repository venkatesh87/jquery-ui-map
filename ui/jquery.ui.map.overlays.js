( function($) {

	$.extend($.ui.gmap.prototype, {
		
		/**
		 * Adds fusion data to the map.
		 * @param fusionTableOptions:google.maps.FusionTablesLayerOptions, http://code.google.com/intl/sv-SE/apis/maps/documentation/javascript/reference.html#FusionTablesLayerOptions
		 * @param fusionTableId:int
		 */
		loadFusion: function(a, b) {
			if (!b) {
				if ( !this.get('overlays').FusionTablesLayer ) {
					this.get('overlays').FusionTablesLayer = new google.maps.FusionTablesLayer();
				}
				this.get('overlays').FusionTablesLayer.setOptions(jQuery.extend({'map': this.getMap() }, a));
			} else {
				// run the old fusiontable code with an id so ppl can use the intersect method
				this.get('overlays').FusionTablesLayer = new google.maps.FusionTablesLayer(b, a);
				this.get('overlays').FusionTablesLayer.setMap(this.get('map'));
			}

		},
		
		/**
		 * Adds markers from KML file or GeoRSS feed
		 * @param uid:String - an identifier for the RSS e.g. 'rss_dogs'
		 * @param url:String - URL to feed
		 * @param kmlLayerOptions:google.maps.KmlLayerOptions, http://code.google.com/intl/sv-SE/apis/maps/documentation/javascript/reference.html#KmlLayerOptions
		 */
		loadKML: function(a, b, c) {
			// KmlLayer has no setOptions method (?)
			this.get('overlays')[a] = new google.maps.KmlLayer(b, jQuery.extend({'map': this.getMap()}, c));
		},
		
		/**
		 * A layer that displays data from Panoramio.
		 * @param panoramioLayerOptions:google.maps.panoramio.PanoramioLayerOptions, http://code.google.com/apis/maps/documentation/javascript/reference.html#PanoramioLayerOptions
		 */
		loadPanoramio: function(a) {
			if ( !this.get('overlays').PanoramioLayer ) {
				this.get('overlays').PanoramioLayer = new google.maps.panoramio.PanoramioLayer();
			}
			this.get('overlays').PanoramioLayer.setOptions(jQuery.extend({'map': this.getMap() }, a));
		}
	
	});
	
} (jQuery) );