
/**
 * Converts an array of objects and constructs and array capable of
 * being shown in a pug checkbox ready for the APC-brand select mixin
 *
 * @module Format/Checkboxify
 * @param  {Array.Object} collection        A collection of objects
 * @param  {String} isSelectedFieldName     Property name on the object which determines the checked status.
 * @param  {String} labelFieldName          Property name on the object which determines the label.
 * @param  {String} valueFieldName          Property name on the object which determines the value
 * @return {Array}                          An array capable of being displayed in a pug checkbox
 *
 * @example
 *
 * const collection = [
 *   {
 *     'name': 'Huey',
 *     'value': '1',
 *     'isSelected': 'true'
 *   },
 *   {
 *     'name': 'Dewey',
 *     'value': '2',
 *     'isSelected': 'false'
 *   },
 *   {
 *     'name': 'Louie',
 *     'value': '3',
 *     'isSelected': 'true'
 *   }
 * ]
 *
 * const res = Checkboxify(collection, 'isSelected', 'name', 'value')
 *
 *  // [ { label: 'Huey', value: '1', checked: 'true' },
 *  // { label: 'Dewey', value: '2', checked: 'false' },
 *  // { label: 'Louie', value: '3', checked: 'true' } ]
 */
module.exports = function (collection, isSelectedFieldName, labelFieldName, valueFieldName) {
  if (collection !== null) {
    const tmp = collection.map(x => {
      return { 'label': x[labelFieldName], 'value': String(x[valueFieldName]), 'checked': x[isSelectedFieldName] }
    })
    return tmp
  }
  return []
}
