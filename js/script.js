function createButtons(btn, lines) {
	const nav = document.querySelector('nav')
	const width = 100/lines.length
	let btns = ""
	for(let i=0;i<lines.length;i++) {
		const data = lines[i].split(';')
		btns+=btn.replace('${target}', data[1]).replace('${caption}', data[0]).replace('${w}', width+'%')
	}
	console.log(btn, lines)
	nav.innerHTML=btns
	document.querySelectorAll(".button").forEach(function(v) {
		v.onclick = function() {
			const xml = new XMLHttpRequest()
			xml.
			onreadystatechange = 
			function() {
				if (xml.readyState===4 && xml.status==200) {
					document.
					querySelector('#out').
					innerHTML = xml.responseText					
				}
			}
			
			xml.open("POST",  `./${v.dataset.file.trim()!=="index.html" ? "html/" : ""}${v.dataset.file}`)
			xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
			
			xml.send()
		}
	})
}

//główna funkcja naszego projektu - pozwala na pobieranie DOWOLNEGO pliku z DOWOLNEGO adresu
//URL - zarówno z naszego projektu, jak i zupełnie odległego
//parametry wejściowe:
// link - odnośnik URL, z którego chcemy pobrać dane/plik
// f - funkcja callback (nazwa funkcji bądź sama funkcja), która wykona się w GWARANTOWANYM czasie
//     w naszym wypadku po realnym pobraniu zawartości wcześniej wskazanego pliku
function getFile(link, f) {
	const xml = new XMLHttpRequest() //stworzenie nowego elementu połączenia asynchronicznego
	//ponieważ tworzymy połączenie zdarzeniowe (nie blokowe) tworzymy obsługę
	//zdarzenia ReadyStateChange - zdarzenie wywołuje się ZAWSZE, gdy serwer odpowie na nasze zapytanie
	xml.onreadystatechange = function() { 
		//warunek kunieczny by upewnić się, że na pewno pobraliśmy plik z serwera (status 4 mówi, że serwer
		//poprawnie odpowiedział na zapytanie, zaś status 200, że plik został przesłany poprawnie)
		if (xml.readyState===4 && xml.status==200) {
			f(xml.responseText) //wywołujemy nasz callback - funkcja wskazana przez drugi parametr; przekazujemy do niej pobraną zawartość pliku
		}
	}
	xml.open("GET", link) //otwieramy połączenie do wskazanego URL, jako GET (pobierż)
	xml.send() //wysyłamy żądanie
}

//wywołanie wcześnie utworzonej funkcji; jako URL podajemy plik csv z naszymi przyciskami
//jako callback piszemy po prostu ciało funkcji nienazwanej - bo nie ma sensu tworzyć funkcji z nazwą
//która zostanie wykorzystana doładnie jeden raz - w tym właśnie fragmencie kodu
getFile("./txtdata/buttons.csv", function(csv) {
	const lines = csv.split('\n') || csv.split('\r') //dzielimy pobrany ciąg znaków na linie (oryginalnie będzie wielkim monolitem)
													//podział następuje po znaku nowej linii (\n) lub powrót kursora (\r)
	getFile("./html/button.html", function(btn) { createButtons(btn, lines) }) //ponownie wywołujemy funkcję getFile, teraz pobierając
	//utworzony wcześniej plik button.html
})

//PONIŻSZY KOD NIE MA ZASTOSOWANIA DO TWORZENIA PRZYCISKÓW (czyli nie dotyczy projektu praktyk)
function addEvents() {
	document.
	querySelectorAll('.button_form').
	forEach(function(v) {
		//v.dataset.href
		v.onclick = function() {
			const xml = new XMLHttpRequest()
			xml.
			onreadystatechange = 
			function() {
				//console.log(xml)
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
				poststr+="name="+document.querySelector("input[name='name']").value+"&"
				poststr+="surname="+document.querySelector("input[name='surname']").value +"&"
				poststr+="login="+document.querySelector("input[name='nick']").value +"&"
				poststr+="haslo="+document.querySelector("input[name='pass']").value 
			}
			xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
			console.log(poststr)
			xml.send(poststr)
		}
	})
}

addEvents()