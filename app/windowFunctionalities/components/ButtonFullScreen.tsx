import { ButtonHTMLAttributes, useEffect, useState } from "react";

export default function ButtonFullScreen({
	children,
	...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
	const [isInFullscreen, setIsInFullscreen] = useState(false);

	useEffect(() => {
		const toggleIsInFullscreen = () =>
			setIsInFullscreen(Boolean(document.fullscreenElement));

		document.addEventListener("fullscreenchange", toggleIsInFullscreen);

		return () =>
			document.removeEventListener("fullscreenchange", toggleIsInFullscreen);
	}, []);

	return (
		<button
			{...rest}
			onClick={() => {
				try {
					if (document.fullscreenElement) {
						document.exitFullscreen();
					} else {
						document.documentElement.requestFullscreen();
					}
				} catch (error) {
					console.error(error);
				}
			}}>
			{children ||
				(isInFullscreen ? "Get out of the fullscreen" : "See fullscreen page")}
		</button>
	);
}
