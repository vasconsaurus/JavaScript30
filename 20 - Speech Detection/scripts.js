import { debounce } from 'lodash';

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e => {
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('')

    p.textContent = transcript;
    if(e.results[0].isFinal) {
      p = document.createElement('p');
      words.appendChild(p);
  }

  if(transcript.includes('horas')) {
    const gettingTheTime = () => {
      timeNow = new Date();
      p.innerHTML = `<p style="color:#FF0000"> >> ${timeNow}</p>`
      if(e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
      }
    }

    const debouncedTime = debounce(gettingTheTime, 2000);

    debouncedTime()
  }
});

recognition.addEventListener('end', recognition.start);
recognition.start();
