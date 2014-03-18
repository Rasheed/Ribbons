$(document).ready(function(){						

var searchIndex = [];	
			$.ajax({
				async: false,
      			url: 'api/friends/get_users_names.php',
      			type: 'GET',
        		success: function(data) {
						console.log(data);
						var names = JSON.parse(data);
						for(var i = 0; i<names.length;i++) {
							searchIndex.push(names[i].FullName);
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
			console.log(e.target);
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
	
	$('.term-list hidden').each(function(clickable) {
		var list = clickable.getElements('li');

		list.addEvent('click', function() {
			console.log("clik");
			var link = this.getElement('a');
			if(this.getFirst('a')) {
				window.location = link
			}
		});
	});
});