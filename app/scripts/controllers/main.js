'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('MainCtrl', function ($scope, $location) {
	
	function displayPodcasts(response) {
		var podcasts = response.feed.entry;
		var out = '<div class="row">';
		var i;
		for(i = 0; i < podcasts.length; i++) {
			var img = podcasts[i]['im:image'][1].label;
			var name = podcasts[i]['im:name'].label;
			var artist = podcasts[i]['im:artist'].label.toUpperCase();
			var id = podcasts[i].id.attributes['im:id'];
			
			if($scope.searchInput == null || 
				name.toUpperCase().indexOf($scope.searchInput.toUpperCase()) != -1 ||
				artist.toUpperCase().indexOf($scope.searchInput.toUpperCase()) != -1) {
				//out += '<div class="col-md-3 podcast-container" onclick="openPodcastDetail(' + id + ')">';
				out += '<div class="col-md-3 podcast-container" id="' + id + '">';
				out += 		'<div class="podcast-card">';
				out += 			'<img class="podcast-icon" src="'+ img +'" />';
				out += 			'<div><b>' + name + '</b></div>';
				out += 			'<div>' + artist + '</div>';
				out += 		'</div>';
				out += '</div>';
			}
		}
		out += '</div>'

		document.getElementById("podcasts").innerHTML = out;
		
		// Add onclick event
		for(i = 0; i < podcasts.length; i++) {
			var id = podcasts[i].id.attributes['im:id'];
			var podcastCard = document.getElementById(id);
			podcastCard.onclick = openPodcastDetail.bind(this, id)
		}
		
	}
	
	
	function getPodcasts() {
		var xmlhttp = new XMLHttpRequest();
		var url = "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";

		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				//displayPodcasts(JSON.parse(this.responseText).feed.entry);
				displayPodcasts(JSON.parse(this.responseText));
			}
		};
		
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	}
	
  	function openPodcastDetail(podcastId) {
		console.log(podcastId);
		$location.url('/podcast');
		//$location.url('/podcast/' + podcastId);
	}
  
	$scope.$watch('searchInput', function(currentValue, previousValue){
		getPodcasts();
	});  
  
  
	window.onload = function() {
		getPodcasts();	
	};  
  
	function boot() {
		
	}
	
	boot();
  
  });
