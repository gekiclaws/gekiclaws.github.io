
function cite(){
	// Data Collection
	var title = document.getElementById("title").value;
	var author1 = document.getElementById("author1").value;
	var author2 = document.getElementById("author2").value;
	var website_name = document.getElementById("website-name").value;
	var publisher = document.getElementById("publisher").value;
	var url = document.getElementById("url").value;
	var date = document.getElementById("date").value;

	// Data Processing 1
	var data = [title, website_name, publisher, date, url];
	var citation = ""; 

	for (i = 0; i < data.length; i++){
		if (data[i] != ""){
			if (i == 0){
				citation = "〈"+data[i]+"〉";
			}

			else{
				if (i == 1){
					if (data[0] == ""){
						citation = "《"+data[i]+"》";
					}
					else{
						citation = citation+"，《"+data[i]+"》";
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
			}
		}
	}

	citation += "。";

	// Data Processing 2
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
	document.getElementById("date").value = "";
}