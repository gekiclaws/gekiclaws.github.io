
function ChangeScreen(){
	var type = document.getElementById("selection").value;
	if (type == "website"){
		//
		let titleText = document.getElementById("title_input");
		titleText.innerText = "標題";
		//
		let webName = document.getElementById("webName_input");
		webName.innerText = "網站名稱";
		//
		let weblink = document.getElementById("weblink_input");
		weblink.style.display="block";
		document.getElementById("url").type="text";
		//
		let use_date = document.getElementById("useDate_input");
		use_date.style.display="block";
		let year2 = document.getElementById("year2");
		year2.style.display="block";
		let mth2 = document.getElementById("month2");
		mth2.style.display="block";
		let day2 = document.getElementById("day2");
		day2.style.display="block";
		//
	}
	else if (type == "book"){
		//
		let titleText = document.getElementById("title_input");
		titleText.innerText = "篇章（如有）";
		//
		let webName = document.getElementById("webName_input");
		webName.innerText = "書名";
		//
		let weblink = document.getElementById("weblink_input");
		weblink.style.display="none";
		document.getElementById("url").type="hidden";
		//
		let use_date = document.getElementById("useDate_input");
		use_date.style.display="none";
		let year2 = document.getElementById("year2");
		year2.style.display="none";
		let mth2 = document.getElementById("month2");
		mth2.style.display="none";
		let day2 = document.getElementById("day2");
		day2.style.display="none";
		//
	}
}

/*
*/