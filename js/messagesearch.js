$(document).ready(function(){						

var userId=sessionStorage.getItem('userId');

var searchIndex = [];	
			$.ajax({
				async: false,
      			url: 'api/friends/get_friends.php',
      			type: 'GET',
				data: {'id': userId},
        		success: function(data) {
						var names = JSON.parse(data);
						for(var i = 0; i<names.length;i++) {
							searchIndex.push(names[i].FirstName + " " + names[i].LastName);
						}
				},
        		error: function(xhr, desc, err) {
          			console.log(xhr);
          			console.log('Details: ' + desc + '\nError:' + err);
        		}
    		});
			
	
	var input = document.getElementById("searchBox"),
		ul = document.getElementById("searchResults"),
		inputTerms, termsArray, prefix, terms, results, sortedResults;


	var search = function() {
	  inputTerms = input.value.toLowerCase();
	  results = [];
	  termsArray = inputTerms.split(' ');
	  prefix = termsArray.length === 1 ? '' : termsArray.slice(0, -1).join(' ') + ' ';
	  terms = termsArray[termsArray.length -1].toLowerCase();
	  
	  for (var i = 0; i < searchIndex.length; i++) {
		var a = searchIndex[i].toLowerCase(),
			t = a.indexOf(terms);
		
		if (t > -1) {
		  results.push(a);
		}
	  }
	  
	  evaluateResults();
	};

	var evaluateResults = function() {
	  if (results.length > 0 && inputTerms.length > 0 && terms.length !== 0) {
		sortedResults = results.sort(sortResults);
		appendResults();
	  } 
	  else if (inputTerms.length > 0 && terms.length !== 0) {
		ul.innerHTML = '<li>Sorry, <strong>' 
		  + inputTerms 
		  + '</strong> has not been found.</li>';
		
	  }
	  else if (inputTerms.length !== 0 && terms.length === 0) {
		return;
	  }
	  else {
		clearResults();
	  }
	};

	var sortResults = function (a,b) {
	  if (a.indexOf(terms) < b.indexOf(terms)) return -1;
	  if (a.indexOf(terms) > b.indexOf(terms)) return 1;
	  return 0;
	}

	var appendResults = function () {
	  clearResults();
	  
	  for (var i=0; i < sortedResults.length && i < 5; i++) {
		var li = document.createElement("li"),
			result = prefix 
			  + sortedResults[i].toLowerCase().replace(terms, '<strong>' 
			  + terms 
			  +'</strong>');
		li.onclick = function (e) {
			$.ajax({
				async: true,
				url: 'api/friends/find_friend_from_search.php',
				type: 'GET',
				data: {'searchField': e.target.textContent},
				success: function(data) {
					var info = JSON.parse(data)
					//console.log(info[0])
					//console.log(input.value);
					input.value = info[0].FullName;
					sessionStorage.setItem('recipientId',info[0].Id);
					console.log($("#searchBar").data("recId"));
				},
				error: function(xhr, desc, err) {
					console.log(xhr);
					console.log('Details: ' + desc + '\nError:' + err);
				}
			});	
		};
		
		li.innerHTML = result;
		ul.appendChild(li);
	  }
	  
	  if ( ul.className !== "term-list") {
		ul.className = "term-list";
	  }
	};

	var clearResults = function() {
	  ul.className = "term-list hidden";
	  ul.innerHTML = '';
	};
	  
	input.addEventListener("keyup", search, false);
});