// Unit 2 Assessment: further-study.js

// Return a sequence of words arranged according to the rules below.
//
// The sequence starts with the first word in the given array. The next word
// will start with the last letter of the preceding word. For example, these
// are all valid sequences of words:
//
//   king, goblin, nose, eat
//   cute, etcetera, antsy, yak, karat
//
// Sometimes, you'll get a word where there are mutliple candidates for the
// next word. For example, if the words are:
//
//   noon, naan, nun
//
// Then the first word in the sequence is 'noon'.
//
//   noon
//
// And the word after that should be the *first* word that starts with 'n'. So,
// even though both 'naan' and 'nun' start with 'n', the next word should be
// 'naan' because 'naan' appears before 'nun'. The final sequence of words will
// be:
//
//   noon, naan, nun
//
// The sequence will continue in this fashion until it runs out of words or it
// can't find words that'll fit the pattern.
//
// Ex.:
//   buildWordChain(['zoo', 'sour', 'racket', 'octos']);
//   => ['zoo', 'octos', 'sour', 'racket']
function buildWordChain(words) {
  const sortedWords = {};
  const wordChain = [];
  let otherWords = [];

  if (words.length === 0) {
    return wordChain;
  }
  if (words.length === 1) {
    return words;
  }

  wordChain.push(words.shift());

  for (const word of words) {
    if (!sortedWords[word[0]]) {
      sortedWords[word[0]] = [`${word}`];
    } else {
      sortedWords[word[0]].push(word);
    }
  }

  for (const firstLetter in sortedWords) {
    let thisLetter = sortedWords[firstLetter];

    for (let index = 0; index <= thisLetter.length; index++) {
      otherWords.push(thisLetter.shift());
    }
  }

  function builder(arr) {
    if (arr.length === 0) {
      return;
    }
    for (const eachWord of arr) {
      let lastWord = wordChain[wordChain.length - 1];
      let lastLetter = lastWord[lastWord.length - 1];
      let newArr = [...arr];

      if (lastLetter === eachWord[0] && !wordChain.includes(`${eachWord}`)) {
        wordChain.push(
          newArr.splice(newArr.indexOf(`${eachWord}`), 1).toString()
        );
        builder(newArr);
      }
    }
  }

  builder(otherWords);

  return wordChain;
}

export { buildWordChain };
