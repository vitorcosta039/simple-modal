function Modal(config) {
	// main element of the modal(wrapper)
	this.el = document.querySelector(`[data-modal='${config.el}']`);

	// selection of element(s) to close the modal
	this.elClose = document.querySelectorAll(`[data-modal-close='${config.el}']`);

	// selection of element(s) to open the modal
	this.elShow = document.querySelectorAll(`[data-modal-show='${config.el}']`);

	// property that defines whether clicking out closes the modal (default: true)
	this.outClickClose = config.outClickClose == false ? false : true;

	// Show modal
	this.show = () => {
		this.el.classList.add('active');
	};

	// Close modal
	this.hide = () => {
		this.el.classList.remove('active');
	};

	// Setting the elements that open the modal
	let _setShowClick = () => {
		this.elShow.forEach((item) => item.addEventListener('click', this.show));
	};

	// Setting the elements that close the modal
	let _setCloseClick = () => {
		this.elClose.forEach((item) => item.addEventListener('click', this.hide));
	};

	// Check if the click out closes the modal
	let _setOutClick = () => {
		if (this.outClickClose == false) return;

		this.el.addEventListener('click', (e) => {
			if (e.currentTarget == e.target) this.hide();
		});
	};

	// Calls the private functions, which are just for setting and checking elements
	(function () {
		_setOutClick();
		_setCloseClick();
		_setShowClick();
	})();
}
