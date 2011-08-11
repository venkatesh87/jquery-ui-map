( function($) {
	
	$.extend($.ui.gmap.prototype, {
		
		
		/* ELEVATION SERVICE */
		
		/**
		 * Makes an elevation request along a path, where the elevation data are returned as distance-based samples along that path.
		 * @param a:google.maps.PathElevationRequest, http://code.google.com/apis/maps/documentation/javascript/reference.html#PathElevationRequest
		 * @param b:function(result:google.maps.ElevationResult, status:google.maps.ElevationStatus), http://code.google.com/intl/sv-SE/apis/maps/documentation/javascript/reference.html#ElevationResult
		 */
		elevationPath: function(a, b) {
			if ( !this.get('services').ElevationService ) {
				this.get('services').ElevationService = new google.maps.ElevationService();
			}
			this.get('services').ElevationService.getElevationAlongPath(a, b);
		},
		
		/**
		 * Makes an elevation request for a list of discrete locations.
		 * @param a:google.maps.PathElevationRequest, http://code.google.com/apis/maps/documentation/javascript/reference.html#PathElevationRequest
		 * @param b:function(result:google.maps.ElevationResult, status:google.maps.ElevationStatus), http://code.google.com/intl/sv-SE/apis/maps/documentation/javascript/reference.html#ElevationResult
		 */
		elevationLocations: function(a, b) {
			if ( !this.get('services').ElevationService ) {
				this.get('services').ElevationService = new google.maps.ElevationService();
			}
			this.get('services').ElevationService.getElevationForLocations(a, b);
		},
		
		/* PLACES SERVICE */		
		
		/**
		 * Retrieves a list of Places in a given area. The PlaceResultss passed to the callback are stripped-down versions of a full PlaceResult. A more detailed PlaceResult for each Place can be obtained by sending a Place Details request with the desired Place's reference value.
		 * @param a:google.maps.places.PlaceSearchRequest, http://code.google.com/apis/maps/documentation/javascript/reference.html#PlaceSearchRequest
		 * @param b:function(result:google.maps.places.PlaceResult, status:google.maps.places.PlacesServiceStatus), http://code.google.com/apis/maps/documentation/javascript/reference.html#PlaceResult
		 */
		placesSearch: function(a, b) {
			if ( !this.get('services').PlacesService ) {
				this.get('services').PlacesService = new google.maps.places.PlacesService(this.get('map'));
			}
			this.get('services').PlacesService.search(a, b);
		},
		
		/**
		 * Retrieves details about the Place identified by the given reference.
		 * @param a:google.maps.places.PlaceDetailsRequest, http://code.google.com/apis/maps/documentation/javascript/reference.html#PlaceDetailsRequest
		 * @param b:function(result:google.maps.places.PlaceResult, status:google.maps.places.PlacesServiceStatus), http://code.google.com/apis/maps/documentation/javascript/reference.html#PlaceResult
		 */
		placesDetails: function(a, b) {
			if ( !this.get('services').PlacesService ) {
				this.get('services').PlacesService = new google.maps.places.PlacesService(this.get('map'));
			}
			this.get('services').PlacesService.getDetails(a, b);
		},
		
		/**
		 * A service to predict the desired Place based on user input. The service is attached to an <input> field in the form of a drop-down list. The list of predictions is updated dynamically as text is typed into the input field. 
		 * @param a:jquery/node/string
		 * @param b:google.maps.places.AutocompleteOptions, http://code.google.com/apis/maps/documentation/javascript/reference.html#AutocompleteOptions
		 */		
		placesAutocomplete: function(a, b) {
			if ( !this.get('services').Autocomplete ) {
				this.get('services').Autocomplete = new google.maps.places.Autocomplete($.ui.gmap._unwrap(a));
			}
		},
		
		/* DISTANCE MATRIX SERVICE */
		
		/**
		 * Issues a distance matrix request.
		 * @param a:google.maps.DistanceMatrixRequest, http://code.google.com/apis/maps/documentation/javascript/reference.html#DistanceMatrixRequest 
		 * @param b:function(result:google.maps.DistanceMatrixResponse, status: google.maps.DistanceMatrixStatus), http://code.google.com/apis/maps/documentation/javascript/reference.html#DistanceMatrixResponse
		 */
		displayDistanceMatrix: function(a, b) {
			if ( !this.get('services').DistanceMatrixService ) {
				this.get('services').DistanceMatrixService = new google.maps.DistanceMatrixService();
			}
			this.get('services').DistanceMatrixService.getDistanceMatrix(a, b);
		},
		
		/* DIRECTIONS SERVICE */
		
		/**
		 * Computes directions between two or more places.
		 * @param request:google.maps.DirectionsRequest, http://code.google.com/intl/sv-SE/apis/maps/documentation/javascript/reference.html#DirectionsRequest
		 * @param options:google.maps.DirectionsRendererOptions, http://code.google.com/intl/sv-SE/apis/maps/documentation/javascript/reference.html#DirectionsRendererOptions
		 * @param callback:function(result:google.maps.DirectionsResult, status:google.maps.DirectionsStatus), http://code.google.com/intl/sv-SE/apis/maps/documentation/javascript/reference.html#DirectionsResult
		 */
		displayDirections: function(a, b, c) {
			var self = this;		
			var map = this.get('map');
			if ( !this.get('services').DirectionsService ) {
				this.get('services').DirectionsService = new google.maps.DirectionsService();
			}
			if ( !this.get('services').DirectionsRenderer ) {
				this.get('services').DirectionsRenderer = new google.maps.DirectionsRenderer();
			}
			this.get('services').DirectionsRenderer.setOptions(b);
			this.get('services').DirectionsService.route(a, function(result, status) {
				if ( status === 'OK' ) {
					if ( b.panel ) {
						self.get('services').DirectionsRenderer.setDirections(result);
						self.get('services').DirectionsRenderer.setMap(map);
					}
				} else {
					self.get('services').DirectionsRenderer.setMap(null);
				}
				$.ui.gmap._trigger(c, result, status);
			});
		},
		
		/**
		 * Displays the panorama for a given LatLng or panorama ID.
		 * @param a:jQuery/String/Node
		 * @param b?:google.maps.StreetViewPanoramaOptions, http://code.google.com/intl/sv-SE/apis/maps/documentation/javascript/reference.html#StreetViewPanoramaOptions
		 */
		displayStreetView: function(a, b) {
			// StreetViewPanorama has no setOptions method (?)
			this.get('services').StreetViewPanorama = new google.maps.StreetViewPanorama($.ui.gmap._unwrap(a), b);
			this.get('map').setStreetView(this.get('services').StreetViewPanorama);
		},
		
		/* GEOCODING SERVICE */
		
		/**
		 * A service for converting between an address and a LatLng.
		 * @param a:google.maps.GeocoderRequest
		 * @param b:function(result:google.maps.GeocoderResult, status:google.maps.GeocoderStatus), http://code.google.com/intl/sv-SE/apis/maps/documentation/javascript/reference.html#GeocoderResult
		 */
		search: function(a, b) {
			if ( !this.get('services').Geocoder ) {
				this.get('services').Geocoder = new google.maps.Geocoder();
			}
			this.get('services').Geocoder.geocode(a, b);
		}
	
	});
	
} (jQuery) );