function addEvents() {
	document.
	querySelectorAll('.button').
	forEach(function(v) {
		//v.dataset.href
		v.onclick = function() {
			const xml = new XMLHttpRequest()
			xml.onreadystatechange = function() {
									console.log(xml)
									if (xml.readyState===4 && xml.status==200) {
										document.
										querySelector('#out').
										innerHTML = xml.responseText
									}
								}
			xml.open("POST", `http://localhost/baza4b/php/${v.dataset.href}.php`)
			xml.send()
		}
	})
}

addEvents()