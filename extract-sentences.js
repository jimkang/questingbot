var ParseEnglish = require('parse-english');
var english = new ParseEnglish();
var pluck = require('lodash.pluck');
var flatten = require('lodash.flatten');

function ExtractSentences(createOpts) {
  return extractSentences;
  
  function extractSentences(text) {
    var cleanedText = text.replace(/https*:\/\/.*\b/g, '');
    var root = english.parse(cleanedText);
    return root.children.reduce(collectSentencesFromParagraph, []);
  }

  // We don't care about paragraph groupings for now. We just want to get the
  // (cleaned) sentences out of them.
  function collectSentencesFromParagraph(sentences, paragraphNode) {
    if (paragraphNode.children) {
      sentences = sentences.concat(
        paragraphNode.children.filter(isSentence).map(wordArrayFromSentenceNode)
      );
    }
    return sentences;
  }

  function wordArrayFromSentenceNode(sentenceNode) {
    var wordNodes = sentenceNode.children.filter(isWord);
    // If dependency-parser handles punctuation someday, we need to leave that in.
    var textNodes = flatten(pluck(wordNodes, 'children')).filter(isText);
    return pluck(textNodes, 'value');
  }
}

function isSentence(n) {
  return n.type === 'SentenceNode';
}

function isWord(n) {
  return n.type === 'WordNode';
}

function isText(n) {
  return n.type === 'TextNode';
}

module.exports = ExtractSentences;
