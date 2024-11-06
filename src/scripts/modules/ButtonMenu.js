import velocity from 'velocity-animate';

class ButtonMenu {
	observerConfig = { attributes: true }

	constructor(elButton, {
		targetEl
	} = {}) {
		this.elButton = elButton;
		[this.lineOne, this.lineTwo, this.lineThree] = [...this.elButton.children];
		this._listAnimations = [];
		this._lastClickDelay;

		this.elButton.addEventListener('click', () => {
			this.eventHandler();
		})
		if(Boolean(targetEl)) {
			this._targetEl = targetEl;
			this._targetEl.on('slideChange', () => {
				if(this._targetEl.activeIndex == 0) {
					this.elButton.classList.add('active');
					return this.animateIn()
				} else {
					this.elButton.classList.remove('active');
					return this.animateOut()
				}
			})
		}
	}

	get isActive() {
		return this.elButton.classList.contains('active');
	}
	get isDisabled() {
		return !this.elButton.classList.contains('active');
	}
	get listElements() {
		return [this.elButton, this.lineOne, this.lineTwo, this.lineThree,]
	}
	get isAnimate() {
		if(this.listAnimations.length == 0) return false;

		return true;
	}

	get listAnimations() {
		return this._listAnimations;
	}
	set listAnimations(listPromise) {
		listPromise = [].concat(listPromise);
		this._listAnimations = listPromise;

		Promise.all(listPromise)
			.then(() => {
				this._listAnimations = [];
			})
	}
	get lastClickDelay() {
		return this._lastClickDelay;
	}
	set lastClickDelay(value) {
		this._lastClickDelay = Date.now();
	}
	setLastClickDelay() {
		this.lastClickDelay = true;
	}
	getBetweenClickDelay() {
		return Date.now() - this.lastClickDelay;
	}

	animateIn() {
		this.listAnimations = [
			velocity(this.lineOne, { top: '50%' }, { duration: 200, easing: 'swing' }), // First line center
			velocity(this.lineThree, { top: '50%' }, { duration: 200, easing: 'swing' }), // Three line center
			velocity(this.lineThree, { rotateZ: '90deg' }, { duration: 800, delay: 200, easing: [500, 25] }), // Three line rotate
			velocity(this.elButton, { rotateZ: '135deg' }, { duration: 800, delay: 200, easing: [500, 25] }), // Button rotate
		];
	}
	animateOut() {
		this.listAnimations = [
			velocity(this.elButton, { rotateZ: '0deg' }, { duration: 800, easing: [500, 25] }),
			velocity(this.lineThree, { rotateZ: '0deg' }, { duration: 200, easing: 'swing' }),
			velocity(this.lineThree, { top: '100%' }, { duration: 800, delay: 200, easing: [500, 25] }),
			velocity(this.lineOne, { top: '0%' }, { duration: 200, delay: 200, easing: 'swing' }),
			velocity(this.lineOne, { top: '0%' }, { duration: 200, delay: 200, easing: 'swing' }),
		];
	}
	animate() {
		if(!this.isAnimate) return Promise.resolve();

		this.listElements.forEach(element => {
			velocity(element, 'stop');
		})
		
		return new Promise(resolve => {
			setTimeout(() => {
				console.log('After 100ms');
				resolve();
			}, 200)
		})
		
	}

	handlerTarget(currentSlide) {
		this._targetEl.slideTo(currentSlide, 500, false)
	}
 
	eventHandler() {
		if(this.getBetweenClickDelay() < 300) {
			console.log('false')
			return false;
		};

		this.setLastClickDelay();

		this.animate()
			.then(() => {
				if(this.isDisabled) {
					this.elButton.classList.add('active');
					this.handlerTarget(0)
					return this.animateIn()
				} else {
					this.elButton.classList.remove(1);
					this.handlerTarget(1)
					return this.animateOut()
				}
			})
	}
}

export default ButtonMenu;