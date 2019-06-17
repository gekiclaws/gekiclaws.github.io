
function cite(){
	// Data Collection
	var title = document.getElementById("title").value;
	var author1 = document.getElementById("author1").value;
	var author2 = document.getElementById("author2").value;
	var website_name = document.getElementById("website-name").value;
	var publisher = document.getElementById("publisher").value;
	var url = document.getElementById("url").value;

	var year1 = document.getElementById("year1").value;
	var month1 = document.getElementById("month1").value;
	var day1 = document.getElementById("day1").value;

	var year2 = document.getElementById("year2").value;
	var month2 = document.getElementById("month2").value;
	var day2 = document.getElementById("day2").value;

	var type = document.getElementById("selection").value;

	// Data Processing 1 (date)
	var date1 = "";
	if (year1 != ""){
		date1 += year1;
	}
	if (month1 != ""){
		date1 += month1;
	}
	if (month1 != ""){
		date1 += day1;
	}

	var date2 = "";
	if (year2 != ""){
		date2 += year2;
	}
	if (month2 != ""){
		date2 += month2;
	}
	if (month2 != ""){
		date2 += day2;
	}

	// Data Processing 2 (url)
	if (url != ""){
		var http = url.includes("http://");
		var https = url.includes("https://");
		if(http){
			url = url.slice(7);
		}
		else if(https){
			url = url.slice(8);
		}
	}

	// Data Processing 3 (right part)
	var data = [title, website_name, publisher, date1, url, date2];
	var citation = ""; 

	for (i = 0; i < data.length; i++){
		if (data[i] != ""){
			if (i == 0){ // title
				citation = "〈"+data[i]+"〉";
			}

			else if (i == 1 & type == "book"){ // webname / bookname
				if (data[0] != ''){
					citation += "，《"+data[i]+"》";
				}
				else{
					citation += "《"+data[i]+"》";
				}
			}

			else{
				var done = false;
				for (x = 0; x < i; x++){
					if (data[x] != ""){
						citation = citation+"，"+data[i];
						done = true;
						break;
					}
				}
				if (done == false){
					citation = data[i];
				}
			}
			console.log(citation);
		}
	}

	citation += "。";

	// Data Processing 4 (left part)
	if (citation == "。"){
		if (author1 != ""){
			if (author2 != ""){
				citation = author1+"及"+author2+citation;
			}
			else{
				citation = author1 +citation;
			}
		}
	}
	else{
		if (author1 != ""){
			if (author2 != ""){
				citation = author1+"及"+author2+"："+citation;
			}
			else{
				citation = author1 + "：" + citation;
			};
		}
	}

	// Presentation
	document.getElementById("citation").innerHTML = citation;

	// Reset
	document.getElementById("title").value = "";
	document.getElementById("author1").value = "";
	document.getElementById("author2").value = "";
	document.getElementById("website-name").value = "";
	document.getElementById("publisher").value = "";
	document.getElementById("url").value = "";
	document.getElementById("year1").value = "";
	document.getElementById("month1").value = "";
	document.getElementById("day1").value = "";
	document.getElementById("year2").value = "";
	document.getElementById("month2").value = "";
	document.getElementById("day2").value = "";
}