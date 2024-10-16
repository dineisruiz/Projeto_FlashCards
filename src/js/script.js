function createFlashcard() {
    const topic = document.getElementById('topic').value;
    const language = document.getElementById('language').value;
    const flashcardText = document.getElementById('flashcard').value;
    const color = document.getElementById('color').value;

    const flashcard = document.createElement('div');
    flashcard.className = `flashcard ${color}`;
    flashcard.innerHTML = `<strong>${topic} (${language})</strong><p>${flashcardText}</p>`;
    
    const container = document.getElementById('flashcards-container');
    container.appendChild(flashcard);

    // Adiciona uma quebra de linha após o flashcard
    if(container.appendChild(flashcard <= 5)){
        container.appendChild(document.createElement('br'))

    } else{

        container.appendChild(flashcard);


    }
    

    // Mostra o título "Flashcards Criados" se houver pelo menos um flashcard
    document.getElementById('flashcards-title').style.display = 'block';
    document.querySelector('.flashcards-label').style.display = 'block';

    // Limpa os campos após criar o flashcard
    document.getElementById('topic').value = '';
    document.getElementById('language').value = '';
    document.getElementById('flashcard').value = '';
}

function saveFlashcards(format) {
    const flashcards = document.querySelectorAll('.flashcard');
    let data = 'Tópico,Idioma,Texto,Cor\n';

    flashcards.forEach(card => {
        const header = card.querySelector('strong').innerText;
        const topic = header.split(' (')[0];
        const language = header.split('(')[1].replace(')', '');
        const text = card.querySelector('p').innerText;
        const color = card.classList[1];
        data += `${topic},${language},${text},${color}\n`;
    });

    if (format === 'txt') {
        const blob = new Blob([data], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'flashcards.txt';
        a.click();
    } else if (format === 'xls') {
        const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'flashcards.xls';
        a.click();
    }
}

function loadFlashcards() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt,.xls';
    input.onchange = event => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const lines = reader.result.split('\n');
            document.getElementById('flashcards-container').innerHTML = ''; // Limpa os flashcards existentes
            lines.forEach(line => {
                const [topic, language, text, color] = line.split(',');
                if (topic && language && text && color) {
                    const flashcard = document.createElement('div');
                    flashcard.className = `flashcard ${color.trim()}`;
                    flashcard.innerHTML = `<strong>${topic.trim()} (${language.trim()})</strong><p>${text.trim()}</p>`;
                    document.getElementById('flashcards-container').appendChild(flashcard);

                    // Adiciona uma quebra de linha após o flashcard
                   // document.getElementById('flashcards-container').appendChild(document.createElement('br'));
                }
            });
            updateFlashcardsLabelVisibility();
        };
        reader.readAsText(file);
    };
    input.click();
}

function removeFlashcard() {
    const flashcardsContainer = document.getElementById('flashcards-container');
    if (flashcardsContainer.hasChildNodes()) {
        flashcardsContainer.removeChild(flashcardsContainer.lastChild); // Remove a quebra de linha
        //flashcardsContainer.removeChild(flashcardsContainer.lastChild); // Remove o flashcard
        updateFlashcardsLabelVisibility();
    }
}

function searchFlashcards() {
    const input = document.getElementById('search').value.toLowerCase();
    const flashcards = document.querySelectorAll('.flashcard');
    
    flashcards.forEach(card => {
        const topic = card.querySelector('strong').innerText.toLowerCase();
        if (topic.includes(input)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

function updateFlashcardsLabelVisibility() {
    const flashcardsContainer = document.getElementById('flashcards-container');
    const hasFlashcards = flashcardsContainer.querySelector('.flashcard');
    
    if (hasFlashcards) {
        document.getElementById('flashcards-title').style.display = 'block';
        document.querySelector('.flashcards-label').style.display = 'block';
    } else {
        document.getElementById('flashcards-title').style.display = 'none';
        document.querySelector('.flashcards-label').style.display = 'none';
    }
}
