class Cap {
	constructor(elSelector, { indent, fixMenu } = {} ) {
		this.elSelector = elSelector;
		this.scrollMenu = document.querySelector(elSelector);
		this.fixMenu = document.querySelector(fixMenu)
		this.indent = indent;
	}
	get elHeight() {
		return Math.abs(this.scrollMenu.getBoundingClientRect().height);
	}
	get distanceShow() {
		return this.elHeight + this.indent;
	}
	get isFix() {
		const result = window.scrollY > this.distanceShow ? true : false;
		return result;
	}

	visible() {
		this.scrollMenu.classList.add('cap_fix-active')

		this.scrollMenu.inert = false;
		this.fixMenu.inert = true;
	}
	hidden() {
		this.scrollMenu.classList.remove('cap_fix-active')

		this.scrollMenu.inert = true;
		this.fixMenu.inert = false;
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