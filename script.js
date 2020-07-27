const getCustomSelectTemplate = (data = [], placeholder, selectedId) => {
	let phText = placeholder || 'Select an item from the list:';
	const items = data.map((i) => {
		let classes = '';
		if (i.id === selectedId) {
			phText = i.value;
			classes = 'selected';
		}
		return `<li class='custom-select__item ${classes}' data-type='item' data-id='${i.id}'>${i.value}</li>`
	});
	return `
	<div class="custom-select__wall" data-type="wall"></div>
	<div class="custom-select__input" data-type='input' data-input-toggle='true'>
	<span data-type='value' data-input-toggle='true'>${phText}</span>
	<i class="fa fa-angle-down" data-type='arrow' data-input-toggle='true'></i></div>
	<div class="custom-select__dropdown">
		<ul class="custom-select__list">
			${items.join('')}
		</ul>
	</div>`
}

class CustomSelect {
	constructor(selector, options) {
		this.select = document.getElementById(selector);
		this.options = options;
		this.selectedId = options.selectedId;
		this.selectWidth = options.selectWidth;
		this.selectStylingClass = options.selectStylingClass;

		this.#render();
		this.#setup();
	}

	#render() {
		const {placeholder} = this.options;
		const {data} = this.options;
		this.select.innerHTML = getCustomSelectTemplate(data, placeholder, this.selectedId);
		this.selectStylingClass ? this.select.classList.add(this.selectStylingClass) : this.select.classList.add('custom-select');
		this.selectWidth === 'parent' ? this.select.style.width = '100%' : this.select.style.width = this.selectWidth;

	}

	#setup() {
		this.clickHandler = this.clickHandler.bind(this);
		this.select.addEventListener('click', this.clickHandler);
		this.#initVariables();
	}

	#initVariables() {
		this.arrow = this.select.querySelector('[data-type="arrow"]');
		this.value = this.select.querySelector('[data-type="value"]');
	}

	clickHandler(event) {
		const {type} = event.target.dataset;
		const {inputToggle} = event.target.dataset;
		if (inputToggle) {
			this.toggle();
		} else if (type === 'item') {
			const id = event.target.dataset.id;
			this.selectItem(id);
		} else if (type === 'wall') {
			this.close();
		}	
	}

	get isOpen() {
		return this.select.classList.contains('open')
	}

	get current() {
		return this.options.data.find((i) => i.id === this.selectedId);
	}

	addItem(id, value) {
		if (!this.options.data.some((i) => i.id === id)) {
			const obj = {
				'id': String(id),
				'value': value,
			}
			this.options.data.push(obj);
		}

		this.#render();
		this.#initVariables();
	}

	addItems(array) {
		for (const item of array) {
			if (!this.options.data.some((i) => i.id === item.id)) {
				this.options.data.push(item);
			}
		}

		this.#render();
		this.#initVariables();
	}

	deleteItem(id) {
		const index = this.options.data.findIndex((i) => i.id === String(id));
		if (index != -1) {
			this.options.data.splice(index, 1);
		}
		this.#render();
		this.#initVariables();
	}

	deleteItems() {
		//TODO
	}

	selectItem(id) {
		this.selectedId = id;
		this.value.textContent = this.current.value;
		this.select.querySelectorAll(`[data-type="item"]`).forEach((i) => i.classList.remove('selected'));
		this.select.querySelector(`[data-id="${id}"]`).classList.add('selected');
		this.close();
		this.options.onSelect ? this.options.onSelect(this.current) : null;
	}

	toggle() {
		this.isOpen ? this.close() : this.open();
	}

	open() {
		this.select.classList.add('open');
		this.arrow.classList.remove('fa-angle-down');
		this.arrow.classList.add('fa-angle-up');
	}

	close() {
		this.select.classList.remove('open');
		this.arrow.classList.remove('fa-angle-up');
		this.arrow.classList.add('fa-angle-down');
	}

	destroy() {
		this.select.removeEventListener('click', this.clickHandler);
		this.select.innerHTML = '';
	}
}

const select = new CustomSelect('my-custom-select-languages', {
	placeholder: 'Select an item from the list:',
	selectedId: '1',
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