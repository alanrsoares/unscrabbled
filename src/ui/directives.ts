/**
 * injects oon:clickout event listener
 *
 * @param node
 * @returns
 */
export function clickoutDetector(node: Node) {
	const handleClick = (event: Event) => {
		if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
			node.dispatchEvent(
				new CustomEvent('clickout', {
					detail: node
				})
			);
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
