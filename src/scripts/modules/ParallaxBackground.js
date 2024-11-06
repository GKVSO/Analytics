class ParallaxBackground {
	constructor(selector, { rationOffset = 0.3, viewportAnchor = 'top' } = {}) {
		this.el = document.querySelector(selector);
		this._ratioOffset = rationOffset; // Коэффициент умноженым на который получаем backgroundOffset
		this._viewportAnchor = viewportAnchor;
		this._backgroundOffset = this.el.style.getPropertyValue('--background-offset');

		// Подключаем обработчик
		document.addEventListener('scroll', () => {
			this.handler();
		})
	}
	// RATIO
	set ratioOffset(value) {
		// Проверка валидности
		if(value > 1 || value < 0) throw new Error(`${value} cannot be a value for the ratioOffset`);

		this._ratioOffset = value;
	}
	get ratioOffset() {
		return this._ratioOffset;
	}

	// OFFSETS
	get betweenOffset() {
		return Math.abs(this.el.getBoundingClientRect()[this._viewportAnchor]);
	} 
	get backgroundOffset() {
		return this.betweenOffset * this.ratioOffset;
	}
	
	// PROPERTY BC OFFSET
	get propertyBackgroundOffset() {
		return this.el.style.getPropertyValue('--background-offset')
	}
	set propertyBackgroundOffset(value) {
		value = `${value}`.includes('px') ? value : value + 'px';
		this.el.style.setProperty('--background-offset', value)
	}

	replaceNumber(str) {
		return Number(str.replace(/[^0-9]/g, ''))
	}

	handler() {
		this.propertyBackgroundOffset = this.backgroundOffset;
	}
}

export default ParallaxBackground;