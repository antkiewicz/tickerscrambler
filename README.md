# TickerScrambler v0.1.1

TickerScrambler is a text ticker display that uses text scrambling to update text.

## Example

```js
// When used with jQuery
$('.ticker').TickerScrambler({
	list: ['One','Two','Three']
});
```

```js
// Standalone
var el = document.getElementById('ticker');
var ticker = new TickerScrambler(el, {list: ['One','Two','Three']});
```

## Options

Key		| Default	| Description
-------	| ---------	| -----------
charset | String    | String composed of characters used for transition
index 	| 0			| Starting index of ticker
list    | [ ]       | Array of text to transition through
pause 	| 1000		| Pause time before adnacing to next item on list
random  | false     | Display list items in random order
speed   | 33        | Speed at which characters are changed. 33 is about 30fps

## Issues + Todos

None