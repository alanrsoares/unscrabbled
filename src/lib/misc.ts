export const preventDefault = <T extends MouseEvent>(e: T) => e.preventDefault();

export const clamp = ({ max = Infinity, min = -Infinity }, value: number) => {
	return value < min ? min : value > max ? max : value;
};
