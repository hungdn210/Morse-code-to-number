function Data() {
  letters = {
    ' ': '/',
    'emp': 'e',
    'A': '.-',  
    'B': '-...',   
    'C': '-.-.',
    'D': '-..',  
    'E': '.',  
    'F': '..-.',
    'G': '--.',
    'H': '....',
    'I': '..',
    'J': '.---',
    'K': '-.-',
    'L': '.-..',
    'M': '--',
    'N': '-.',
    'O': '---',
    'P': '.--.',
    'Q': '--.-',
    'R': '.-.',
    'S': '...',
    'T': '-',
    'U': '..-',
    'V': '...-',
    'W': '.--',
    'X': '-..-',
    'Y': '-.--',
    'Z': '--..',

    '0': '-----',
    '1': '.----',
    '2': '..---',
    '3': '...--',
    '4': '....-',
    '5': '.....',
    '6': '-....',
    '7': '--...',
    '8': '---..',
    '9': '----.'
  }
  this.setUpMorseCode = () => {
    //create a random number and change it to morse code
    numberText = random(AMOUNT_NUMBER);
    morseText = letters[numberText];
    console.log(numberText);
    console.log(morseText);
  }
}