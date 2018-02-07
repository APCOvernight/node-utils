<a name="Utils/Differ"></a>

## Utils/Differ
**Kind**: global class  

* [Utils/Differ](#Utils/Differ)
    * [new Utils/Differ()](#new_Utils/Differ_new)
    * [.Differ](#Utils/Differ.Differ)
        * [new Differ(lhs, rhs)](#new_Utils/Differ.Differ_new)
    * [.Differ#diff](#Utils/Differ.Differ+diff) ⇒ <code>Object</code>
    * [.Differ#changed](#Utils/Differ.Differ+changed) ⇒ <code>Array</code>
    * [.Differ#before](#Utils/Differ.Differ+before) ⇒ <code>Object</code>
    * [.Differ#after](#Utils/Differ.Differ+after) ⇒ <code>Object</code>

<a name="new_Utils/Differ_new"></a>

### new Utils/Differ()
Compare keys and values of 2 single dimension objects

<a name="Utils/Differ.Differ"></a>

### Utils/Differ.Differ
**Kind**: static class of [<code>Utils/Differ</code>](#Utils/Differ)  
<a name="new_Utils/Differ.Differ_new"></a>

#### new Differ(lhs, rhs)

| Param | Type | Description |
| --- | --- | --- |
| lhs | <code>Object</code> | 1st object to compare |
| rhs | <code>Object</code> | Object to compare against lhs |

<a name="Utils/Differ.Differ+diff"></a>

### Utils/Differ.Differ#diff ⇒ <code>Object</code>
Object with fields that have changed

**Kind**: static property of [<code>Utils/Differ</code>](#Utils/Differ)  
**Example**  
```js
new Differ(lObject, rObject).diff
// returns {
//   someProperty: 'newValue'
// }
```
<a name="Utils/Differ.Differ+changed"></a>

### Utils/Differ.Differ#changed ⇒ <code>Array</code>
Array of fields that have changed

**Kind**: static property of [<code>Utils/Differ</code>](#Utils/Differ)  
**Example**  
```js
new Differ(lObject, rObject).changed
// returns [ 'someProperty', 'anotherProperty' ]
```
<a name="Utils/Differ.Differ+before"></a>

### Utils/Differ.Differ#before ⇒ <code>Object</code>
Object with changed fields, as they were before changes (in lhs)

**Kind**: static property of [<code>Utils/Differ</code>](#Utils/Differ)  
**Example**  
```js
new Differ(lObject, rObject).before
// returns {
//   someProperty: 'oldValue'
// }
```
<a name="Utils/Differ.Differ+after"></a>

### Utils/Differ.Differ#after ⇒ <code>Object</code>
Object with changed fields, as they were after changes (in rhs)

**Kind**: static property of [<code>Utils/Differ</code>](#Utils/Differ)  
**Example**  
```js
new Differ(lObject, rObject).after
// returns {
//   someProperty: 'newValue'
// }
```
