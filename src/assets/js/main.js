let input = document.getElementById('inputText')
let message = document.getElementById('message')

let submit = () => {
    let inputText = input.value

    if (inputText) {
        message.innerText = ''
        
        if (document.getElementById('resultDiv')) {
            let resDiv = document.getElementById('resultDiv')
            document.getElementById('results').removeChild(resDiv)            
        }

        fetchData(inputText)
        .then((res) => {
            renderResponse(res)
        })
        .catch(err => console.log(err))
    } else {
        message.innerText = 'Please type in a word'
        message.style.color = 'red'
    }
}


let fetchData = async(text) => {
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`

    let response = await (await fetch(apiUrl)).json()
    return response    
}

let renderResponse = (res) => {
    const resultDiv = document.createElement('div')
    resultDiv.setAttribute('id', 'resultDiv')

    if (res.length > 0) {
        const phonetic = document.createElement('p')

        if (res[0].phonetic) {
            phonetic.innerHTML = `<b>Phonetic: </b>${res[0].phonetic}`
            resultDiv.appendChild(phonetic)
        }

        let defn = document.createElement('div')

        res[0].meanings.forEach((meaning, index) => {
            defn.innerHTML += `<div class="pos">
            <p><b>Part of Speech: </b>${meaning.partOfSpeech}</p>
            <p><b>Definition: </b>${meaning.definitions[0].definition}</p>
            </div>`
        })

        resultDiv.appendChild(defn)
        document.getElementById('results').appendChild(resultDiv)
    } else {
        resultDiv.classList.add('no_result')
        const title = document.createElement('p')
        title.innerText = res.title
        const msg = document.createElement('div')
        msg.innerHTML = `<p>${res.message}</p>
        <p><b>Resolution: </b>${res.resolution}</p>`
        
        resultDiv.appendChild(title)
        resultDiv.appendChild(msg)
        document.getElementById('results').appendChild(resultDiv)        
    }
}