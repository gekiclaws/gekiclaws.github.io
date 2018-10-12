
function cite(){
	// Data Collection
	var title = document.getElementById("title").value;
	var author1 = document.getElementById("author1").value;
	var author2 = document.getElementById("author2").value;
	var website_name = document.getElementById("website-name").value;
	var publisher = document.getElementById("publisher").value;
	var url = document.getElementById("url").value;
	var date = document.getElementById("date").value;

	// Data Processing
	var citation = author1; 
	if (author2 != ""){
		citation = citation+"及"+author2;
	}
	citation = citation+"：〈"+title+"〉";
	citation = citation+"，《"+website_name+"》";
	citation = citation+"，"+publisher;
	citation = citation+"，"+date;
	citation = citation+"，"+url+"。";

	// Presentation
	document.getElementById("citation").innerHTML = citation;

	// Reset
	document.getElementById("title").value = "";
	document.getElementById("author1").value = "";
	document.getElementById("author2").value = "";
	document.getElementById("website-name").value = "";
	document.getElementById("publisher").value = "";
	document.getElementById("url").value = "";
	document.getElementById("date").value = "";
}