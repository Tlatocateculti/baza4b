function addEvents() {
	document.
	querySelectorAll('.button').
	forEach(function(v) {
		//v.dataset.href
		v.onclick = function() {
			const xml = new XMLHttpRequest()
			xml.
			onreadystatechange = 
			function() {
				console.log(xml)
				if (xml.readyState===4 && xml.status==200) {
					document.
					querySelector('#out').
					innerHTML = xml.responseText
					addEvents()
				}
			}
			xml.open("POST", `http://localhost/baza4b/${v.dataset.ext}/${v.dataset.command}.${v.dataset.ext}`)
			let poststr=""
			if (v.dataset.command==="formlogin") {
				poststr+=document.querySelector("input[name='name']").value 
				poststr+=document.querySelector("input[name='surname']").value 
				poststr+=document.querySelector("input[name='nick']").value 
				poststr+=document.querySelector("input[name='pass']").value 
			}
			xml.send()
		}
	})
}

addEvents()