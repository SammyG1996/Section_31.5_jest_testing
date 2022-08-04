/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // First I create a Map
    let chains = new Map();
    // This will go through the array of words that were split up from the input
    // It will then map all the words that follow that specific word and push to a map
    for (let i = 0; i < this.words.length; i ++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      // If the word is already in the map then push the next word
      if (chains.has(word)) {
        chains.get(word).push(nextWord);
      }
      // If the word is not in the map that set the word and 
      // the array containing the next work that follows
      else{
        chains.set(word, [nextWord]);
      } 
    }
    // It then sets the chains to chains
    this.chains = chains;
  }


  // This static method that can be accessed will also
  // create a random number 
  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }


  /** return random text from chains */
  makeText(numWords = 100) {
    // pick a random key to begin
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let out = [];

    // produce markov chain until reaching termination word
    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }

    return out.join(" ");
  }

}

module.exports = {
  MarkovMachine,
};





