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
    numberText = random(amountNumber);
    morseText = letters[numberText];
    console.log(numberText);
    console.log(morseText);
  }
}