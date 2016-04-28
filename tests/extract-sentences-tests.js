var test = require('tape');
var ExtractSentences = require('../extract-sentences');

var extractSentences = ExtractSentences({
});

var testCases = [
    {
      text: 'Searching Airbnb for a spot in Nice, France when magic happened... https://t.co/DKGxvj3vyE',
      expected: [
        [ 'Searching',
        'Airbnb',
        'for',
        'a',
        'spot',
        'in',
        'Nice',
        'France',
        'when',
        'magic',
        'happened' ]
      ]
    },
    {
      text: 'Today\'s niche observation: the claymore is indespensable to deal with the toxic rats so you can properly get under The Royal Rat Authority',
      // TODO: Handle apostrophes.
      expected: [ [ 'Today',
        's',
        'niche',
        'observation',
        'the',
        'claymore',
        'is',
        'indespensable',
        'to',
        'deal',
        'with',
        'the',
        'toxic',
        'rats',
        'so',
        'you',
        'can',
        'properly',
        'get',
        'under',
        'The',
        'Royal',
        'Rat',
        'Authority' ] ]
    },
    {
      text: 'Fire Hand-light',
      expected: [ [ 'Fire', 'Hand', 'light' ] ]
    },
    {
      text: 'Ye find yeself in yon dungeon. Ye see a SCROLL. Behind ye scroll is a FLASK. Obvious exits are NORTH, SOUTH and DENNIS.',
      expected: [
      [ 'Ye', 'find', 'yeself', 'in', 'yon', 'dungeon' ],
      [ 'Ye', 'see', 'a', 'SCROLL' ],
      [ 'Behind', 'ye', 'scroll', 'is', 'a', 'FLASK' ],
      [ 'Obvious', 'exits', 'are', 'NORTH', 'SOUTH', 'and', 'DENNIS' ]
    ]
    }
];

testCases.forEach(runTest);

function runTest(testCase) {
  test('Extract sentence test: ' + testCase.text.substr(0, 50), extractTest);

  function extractTest(t) {
    t.deepEqual(extractSentences(testCase.text), testCase.expected, 'Sentences are correct.');
    t.end();
  }
}
