# custom-select library.

Using to add and styling custom `select` element.
Technologies: html, css, pure JavaScript.

## For using:

1. Add an element to the `HTML` markup of the page with an arbitrary `#ID`, which you will need to specify later when creating the Select instance.  
```html
<div id="my-custom-select-languages"></div>
```

2. Connect or copy the contents of the file with the CustomSelect class.
3. Include styles (css) for correct display of Select.
4. Create a new instance of the CustomSelect class with your element and customization.  
```javascript
const select = new CustomSelect('my-custom-select-languages', {
	placeholder: 'Select an item from the list:',
	selectedId: 1,
	selectWidth: 'parent',
	selectStylingClass: 'custom-select',
	data: [
		{id: '1', value: 'JavaScript'},
		{id: '2', value: 'HTML'},
		{id: '3', value: 'React'},
		{id: '4', value: 'Angular'},
		{id: '5', value: 'ReactNative'},
		{id: '6', value: 'PHP'},
		{id: '7', value: 'Prolog'},
		{id: '8', value: 'Turbo Pascal'},
	],
	onSelect(item) {
		console.log('Selected item: ', item);
	}
})
```
5. Add to `<head>` element, link to fontawesome `<link href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" rel="stylesheet">`. (For arrow icons).

### Description of the passed arguments:
**First argument:**\
The first argument is the ID of the select element. In our example, this is `my-custom-select-languages`.\
**Second argument:**\
As the second argument, we pass an `object with the settings` of our select.

- `placeholder` - *Optional*. The text that is displayed in the input field by default. If not specified, the text from the code will be displayed.
- `selectedId` - *Optional*. Id from array with data of the element that will be selected by default. If not set, placeholder will be.
- `selectedWidth` - *Optional*. The size of the select element. If `parent` is set - select will across the entire width of the parent. Also accepts any other units, for example: `250px`, `50%`, etc.
- `selectStylingClass` - *Optional*. A class that will be assigned to the parent select element (in our case, this is `my-custom-select-languages`), with which styles from css will work. By default, this is the `custom-select` class.
- `data` - an array of value objects to be displayed when the select is opened.
- `onSelect(item)` - *Optional*. A callback function that will be called when an option is selected. Takes an `item` argument to which the object of the selected value will be passed. 

### Methods:

- `select.selectItem('3')` - selects the value with the given id from the list. All values are passed in `string format`.
- `select.open()` - opens dropdown.
- `select.close()` - closes dropdown.
- `select.toggle()` - toggles dropdown.
- `select.addItem(id, value)` - add new item to dropdown and refresh list.
- `select.addItems(array)` - (array with objects like in `data`) add new items to dropdown and refresh list.
- `select.deleteItem(id)` - delete id from list and refresh it.
- `select.deleteAllItems()` - delete all items from list ans show placeholder.
- `select.destroy()` - deleting select innerHTML.

### Properties:
- `select.current` - returns object with selected value.
- `select.selectedId` - returns ID of selected item.
- `select.isOpen` - returns true / false. True if dropdown opened.


