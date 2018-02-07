## Modules

<dl>
<dt><a href="#module_Format/BuildUrl">Format/BuildUrl</a> ⇒ <code>String</code></dt>
<dd><p>Format an absolute url from within a view</p>
</dd>
<dt><a href="#module_Format/Checkboxify">Format/Checkboxify</a> ⇒ <code>Array</code></dt>
<dd><p>Converts an array of objects and constructs and array capable of
being shown in a pug checkbox ready for the APC-brand select mixin</p>
</dd>
<dt><a href="#module_Format/CleanObject">Format/CleanObject</a> ⇒ <code>Object</code></dt>
<dd><p>Remove undefined keys from an object. Useful for preparing
sanitized fields before filling a Lucid model</p>
</dd>
<dt><a href="#module_Format/DateOfBirth">Format/DateOfBirth</a> ⇒ <code>Object</code></dt>
<dd><p>Return form field options and values for date of birth</p>
</dd>
<dt><a href="#module_Format/Errors">Format/Errors</a> ⇒ <code>Object</code></dt>
<dd><p>Format Adonis Validator error messages in a format that
works with APC input mixins</p>
</dd>
<dt><a href="#module_Format/HiddenBool">Format/HiddenBool</a> ⇒ <code>String</code></dt>
<dd><p>Set boolean(ish) string value to &#39;true&#39;, &#39;false&#39; or &#39;&#39;.
Used for populating hidden form inputs in views</p>
</dd>
<dt><a href="#Format/Sanitize.module_regexReplace">regexReplace</a> ⇒ <code>String</code></dt>
<dd><p>Remove regex matches from a string</p>
</dd>
<dt><a href="#Format/Sanitize.module_optionalDate">optionalDate</a> ⇒ <code>String</code> | <code>Null</code></dt>
<dd><p>Convert date submitted by datepicker to mysql format.
If can&#39;t be parsed as date, return as is to let Validator
fail it</p>
</dd>
<dt><a href="#Format/Sanitize.module_alphaNumeric">alphaNumeric</a> ⇒ <code>String</code></dt>
<dd><p>alphaNumeric sanitization - strip out any characters that are not Alpha Numeric</p>
</dd>
<dt><a href="#Format/Sanitize.module_alpha">alpha</a> ⇒ <code>String</code></dt>
<dd><p>Alpha sanitization - strip out characters that are not Alpha.</p>
</dd>
<dt><a href="#Format/Sanitize.module_numeric">numeric</a> ⇒ <code>String</code></dt>
<dd><p>Numeric sanitization - strips out any characters that are not Numeric</p>
</dd>
<dt><a href="#Format/Sanitize.module_username">username</a> ⇒ <code>String</code></dt>
<dd><p>Sanitizes social media usernames (stripping + and @ from start)</p>
</dd>
<dt><a href="#Format/Sanitize.module_urlProtocol">urlProtocol</a> ⇒ <code>String</code></dt>
<dd><p>Add http:// to a url if no protocol specified</p>
</dd>
<dt><a href="#module_Format/SelectNestify">Format/SelectNestify</a> ⇒ <code>Array</code></dt>
<dd><p>Convert an object to an array of grouped labels and values
ready for the APC-brand select mixin</p>
</dd>
<dt><a href="#module_Format/Selectify">Format/Selectify</a> ⇒ <code>Array</code></dt>
<dd><p>Convert an object to an array of label and values
ready for the APC-brand select mixin</p>
</dd>
<dt><a href="#module_Format/TitleFilters">Format/TitleFilters</a> ⇒ <code>String</code></dt>
<dd><p>Create subheader string showing total records and
active filters, to be appended to page header of
search results.</p>
</dd>
</dl>

<a name="module_Format/BuildUrl"></a>

## Format/BuildUrl ⇒ <code>String</code>
Format an absolute url from within a view

**Returns**: <code>String</code> - Absolute Url  
**Requires**: <code>module:build-url</code>  

| Param | Type | Description |
| --- | --- | --- |
| baseUrl | <code>String</code> | App base url (Protocol + Domain name) |
| path | <code>String</code> | Url path |
| [queryParams] | <code>Object</code> | Key/Value pairs of query paramters |
| [hash] | <code>String</code> | Url hash |

**Example**  
```js
const params = {
  depotId: 21,
  sort: asc
}

const path = '/admin/'

const hash = anchor_34

BuildUrl(path, params, hash)

// returns 'http://mybase.com/admin?depotId=21&sort=asc#anchor_34'
```
<a name="module_Format/Checkboxify"></a>

## Format/Checkboxify ⇒ <code>Array</code>
Converts an array of objects and constructs and array capable of
being shown in a pug checkbox ready for the APC-brand select mixin

**Returns**: <code>Array</code> - An array capable of being displayed in a pug checkbox  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Array.Object</code> | A collection of objects |
| isSelectedFieldName | <code>String</code> | Property name on the object which determines the checked status. |
| labelFieldName | <code>String</code> | Property name on the object which determines the label. |
| valueFieldName | <code>String</code> | Property name on the object which determines the value |

**Example**  
```js
const collection = [
  {
    'name': 'Huey',
    'value': '1',
    'isSelected': 'true'
  },
  {
    'name': 'Dewey',
    'value': '2',
    'isSelected': 'false'
  },
  {
    'name': 'Louie',
    'value': '3',
    'isSelected': 'true'
  }
]

const res = Checkboxify(collection, 'isSelected', 'name', 'value')

 // [ { label: 'Huey', value: '1', checked: 'true' },
 // { label: 'Dewey', value: '2', checked: 'false' },
 // { label: 'Louie', value: '3', checked: 'true' } ]
```
<a name="module_Format/CleanObject"></a>

## Format/CleanObject ⇒ <code>Object</code>
Remove undefined keys from an object. Useful for preparing
sanitized fields before filling a Lucid model

**Returns**: <code>Object</code> - Cleaned object  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | Object to be cleaned |

**Example**  
```js
CleanObject({
  keepThis: 1,
  loseThis: undefined
})
// returns { keepThis: 1 }
```
<a name="module_Format/DateOfBirth"></a>

## Format/DateOfBirth ⇒ <code>Object</code>
Return form field options and values for date of birth

**Returns**: <code>Object</code> - Select options and selected values ready for select mixins  
**Requires**: <code>module:moment</code>  

| Param | Type | Description |
| --- | --- | --- |
| [dateOfBirth] | <code>String</code> | Partial or complete URL |

**Example**  
```js
DateOfBirth('1995-03-05')

// returns {
//   days: [{label: '1', value: '01'}, {label: '1', value: '02'}...],
//   months: [{label: 'January', value: '01'}, {label: 'February', value: '02'}...],
//   years: [{label: '1920', value: '1920'}, {label: '1921', value: '1921'}...],
//   day: '05',
//   month: '03',
//   year: '1995'
// }
```
<a name="module_Format/Errors"></a>

## Format/Errors ⇒ <code>Object</code>
Format Adonis Validator error messages in a format that
works with APC input mixins

**Returns**: <code>Object</code> - Object with keys for field names  

| Param | Type | Description |
| --- | --- | --- |
| errors | <code>Array</code> | Array of objects with errors |

**Example**  
```js
FormatErrors([{ field: 'name', message: 'Name is required' }])

// returns { name: 'Name is required' }
```
<a name="module_Format/HiddenBool"></a>

## Format/HiddenBool ⇒ <code>String</code>
Set boolean(ish) string value to 'true', 'false' or ''.
Used for populating hidden form inputs in views

**Returns**: <code>String</code> - 'true', 'false' or '' to be posted with form  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> \| <code>Null</code> \| <code>Boolean</code> | model value |

**Example**  
```js
HiddenBool(1)
// returns 'true'
```
**Example**  
```js
HiddenBool('false')
// returns 'false'
```
**Example**  
```js
HiddenBool()
// returns ''
```
<a name="Format/Sanitize.module_regexReplace"></a>

## regexReplace ⇒ <code>String</code>
Remove regex matches from a string

**Returns**: <code>String</code> - sanitized output  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | unsanitized input |
| regex | <code>Regex</code> | Regex pattern to match |

<a name="Format/Sanitize.module_optionalDate"></a>

## optionalDate ⇒ <code>String</code> \| <code>Null</code>
Convert date submitted by datepicker to mysql format.
If can't be parsed as date, return as is to let Validator
fail it

**Returns**: <code>String</code> \| <code>Null</code> - YYYY-MM-DD  
**Requires**: <code>module:moment</code>  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>String</code> | Human Friendly Date |

**Example**  
```js
Sanitize.optionalDate('24th November 2016')

// returns '2016-11-24'
```
**Example**  
```js
Sanitize.optionalDate('')

// returns null
```
<a name="Format/Sanitize.module_alphaNumeric"></a>

## alphaNumeric ⇒ <code>String</code>
alphaNumeric sanitization - strip out any characters that are not Alpha Numeric

**Returns**: <code>String</code> - sanitized output  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | unsanitized input |

<a name="Format/Sanitize.module_alpha"></a>

## alpha ⇒ <code>String</code>
Alpha sanitization - strip out characters that are not Alpha.

**Returns**: <code>String</code> - sanitized output  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | unsanitized input |

<a name="Format/Sanitize.module_numeric"></a>

## numeric ⇒ <code>String</code>
Numeric sanitization - strips out any characters that are not Numeric

**Returns**: <code>String</code> - sanitized output  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | unsanitized input |

<a name="Format/Sanitize.module_username"></a>

## username ⇒ <code>String</code>
Sanitizes social media usernames (stripping + and @ from start)

**Returns**: <code>String</code> - sanitized output  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | unsanitized input |

<a name="Format/Sanitize.module_urlProtocol"></a>

## urlProtocol ⇒ <code>String</code>
Add http:// to a url if no protocol specified

**Returns**: <code>String</code> - Complete URL  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | Partial or complete URL |

**Example**  
```js
Url('google.com')
// returns 'http://google.com'
```
**Example**  
```js
Url('https://facebook.com')
// returns 'https://facebook.com'
```
<a name="module_Format/SelectNestify"></a>

## Format/SelectNestify ⇒ <code>Array</code>
Convert an object to an array of grouped labels and values
ready for the APC-brand select mixin

**Returns**: <code>Array</code> - Nested label and value objects in an array ready for select mixin  

| Param | Type | Description |
| --- | --- | --- |
| groups | <code>Array</code> | Array of optgroups objects |
| valueKey | <code>String</code> | key for option value |
| labelKey | <code>String</code> | key for option label |
| childrenKey | <code>String</code> | key for options array |
| [first] | <code>Object</code> | The first select option (overrides default) |

**Example**  
```js
const array = [
{
  id: 1,
  name: 'rebels',
  team: [{
      id: 2,
      name: 'leia'
    }, {
      id: 3,
      name: 'luke'
    }]
}, {
  id: 4,
  name: 'empire',
  team: [{
      id: 5,
      name: 'vader'
    }, {
      id: 6,
      name: 'tarkin'
    }]
}, {
  id: 7,
  name: 'gungans'
}
]

SelectNestify(array, 'id', 'name', 'team', null)

// returns [
// {
//   label: ' ',
//   value: null
// }, {
//   label: 'rebels',
//   children: [{
//       label: 'leia',
//       value: 2
//     }, {
//       label: 'luke',
//       value: 3
//     }]
// }, {
//   label: 'empire',
//   children: [{
//       label: 'vader',
//       value: 5
//     }, {
//       label: 'tarkin',
//       value: 6
//     }]
// }, {
//   label: 'gungans',
//   children: []
// }
// ]
```
<a name="module_Format/Selectify"></a>

## Format/Selectify ⇒ <code>Array</code>
Convert an object to an array of label and values
ready for the APC-brand select mixin

**Returns**: <code>Array</code> - label and value objects in an array ready for select mixin  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | Object of shortnames and longnames |
| [first] | <code>Object</code> | The first select option (overrides default) |
| [sort] | <code>Boolean</code> | sort by value or label? |

**Example**  
```js
const definitions = {
  pending: 'Awaiting Modification',
  rejected: 'Not Approved'
}

Selectify(definitions, null, true)

// returns [{
//   value: 'pending',
//   label: 'Awaiting Modification'
// }, {
//   label: 'Not Approved',
//   value: 'rejected'
// }]
```
<a name="module_Format/TitleFilters"></a>

## Format/TitleFilters ⇒ <code>String</code>
Create subheader string showing total records and
active filters, to be appended to page header of
search results.

**Returns**: <code>String</code> - Subheader string  

| Param | Type | Description |
| --- | --- | --- |
| total | <code>Integer</code> | Total records |
| [filters] | <code>Object</code> | Filters and their selected options |

**Example**  
```js
TitleFilters(50)
// returns ' (50)'
```
**Example**  
```js
TitleFilters(50, {status: 'published'})
// returns ' - published (50)'
```
**Example**  
```js
TitleFilters(50, {status: 'published', depot: 'EDS Couriers'})
// returns ' - published & EDS Couriers (50)'
```
