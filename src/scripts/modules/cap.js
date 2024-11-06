class Cap {
	constructor(elSelector, indent) {
		this.elSelector = elSelector;
		this.el = document.querySelector(elSelector);
		this.indent = indent;
	}
	get elHeight() {
		return Math.abs(this.el.getBoundingClientRect().height);
	}
	get distanceShow() {
		return this.elHeight + this.indent;
	}
	get isFix() {
		const result = window.scrollY > this.distanceShow ? true : false;
		return result;
	}

	visible() {
		this.el.classList.add('cap_fix-active')
	}
	hidden() {
		this.el.classList.remove('cap_fix-active')
	}
	handler() {
		console.log(this.isFix)
		if(this.isFix) {
			this.visible();
		} else {
			this.hidden();
		}
	}
}

export default Cap;