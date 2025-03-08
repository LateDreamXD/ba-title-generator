export default class Windows {
	public target: string | HTMLElement | HTMLElement[];
	private startX: number;
	private startY: number;
	private initialX: number;
	private initialY: number;

	constructor(target: string | HTMLElement | HTMLElement[]) {
		this.startX = 0;
		this.startY = 0;
		this.initialX = 0;
		this.initialY = 0;
		this.target = target;
	}

	private handleMouseDown = (window: HTMLElement, event: MouseEvent) => {
		this.startX = event.clientX;
		this.startY = event.clientY;
		
		this.initialX = window.offsetLeft || 0;
		this.initialY = window.offsetTop || 0;

		window.style.zIndex = '100';
		window.addEventListener('mousemove', this.handleMouseMove);
		window.addEventListener('mouseup', this.handleMouseUp);
	}

	private handleMouseMove = (event: MouseEvent) => {
		const deltaX = event.clientX - this.startX;
		const deltaY = event.clientY - this.startY;

		const window = event.currentTarget as HTMLElement;
		window.style.left = `${this.initialX + deltaX}px`;
		window.style.top = `${this.initialY + deltaY}px`;
	}

	private handleMouseUp = (event: MouseEvent) => {
		const window = event.currentTarget as HTMLElement;
		window.style.zIndex = 'auto';
		window.removeEventListener('mousemove', this.handleMouseMove);
		window.removeEventListener('mouseup', this.handleMouseUp);
	}

	public initListeners() {
		try {
			if (typeof this.target === 'string') {
				this.target = Array.from(document.querySelectorAll(this.target));
			}
			const handleMouseDownBound = (element: HTMLElement) => (ev: MouseEvent) => this.handleMouseDown(element, ev);
			if (Array.isArray(this.target)) {
				console.log('Multiple targets');
				this.target.forEach((element: HTMLElement, index: number) => {
					const boundMouseDown = handleMouseDownBound(element);
					element.querySelector('.header')!.addEventListener('mousedown', boundMouseDown as EventListener);
				});
			} else {
				const boundMouseDown = handleMouseDownBound(this.target as HTMLElement);
				this.target.querySelector('.header')!.addEventListener('mousedown', boundMouseDown as EventListener);
			}
			console.log('Windows listeners initialized');
		} catch (err) {
			console.error(err);
		}
	}
}
