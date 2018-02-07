## Modules

<dl>
<dt><a href="#module_Parse/Bool">Parse/Bool</a> ⇒ <code>Boolean</code> | <code>Null</code></dt>
<dd><p>Parse post request from an HTML input. Useful for true/false radio buttons</p>
</dd>
<dt><a href="#module_Parse/StringArrayToNumberArray">Parse/StringArrayToNumberArray</a> ⇒ <code>Array</code></dt>
<dd><p>Gets an array of strings, and returns an array of numbers. Non numbers are removed.
Useful for dealing with form post re-order values.</p>
</dd>
</dl>

<a name="module_Parse/Bool"></a>

## Parse/Bool ⇒ <code>Boolean</code> \| <code>Null</code>
Parse post request from an HTML input. Useful for true/false radio buttons

**Returns**: <code>Boolean</code> \| <code>Null</code> - Bool or Null to be saved to model  

| Param | Type | Description |
| --- | --- | --- |
| [value] | <code>String</code> \| <code>Null</code> \| <code>Boolean</code> | request field |

**Example**  
```js
ParseBool('1')
// returns true
```
**Example**  
```js
ParseBool('false')
// returns false
```
**Example**  
```js
ParseBool('')
// returns null
```
<a name="module_Parse/StringArrayToNumberArray"></a>

## Parse/StringArrayToNumberArray ⇒ <code>Array</code>
Gets an array of strings, and returns an array of numbers. Non numbers are removed.
Useful for dealing with form post re-order values.

**Returns**: <code>Array</code> - Array of numbers  

| Param | Type | Description |
| --- | --- | --- |
| stringArray | <code>Array</code> | An array of strings |

**Example**  
```js
StringArrayToNumberArray(['1', '2', '3'])
// returns [1, 2, 3]
```
**Example**  
```js
StringArrayToNumberArray()
// returns []
```
**Example**  
```js
StringArrayToNumberArray(['1', 'A', '3'])
// returns [1, 3]
```
