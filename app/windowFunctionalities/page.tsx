"use client";

import { useEffect, useState } from "react";

import ButtonFullScreen from "./components/ButtonFullScreen";
import styles from "./styles.module.css";

export default function Home() {
	const [isInteractedThePage, setIsInteractedThePage] = useState(false);

	const [currentlyAudio, setcurrentlyAudio] = useState<
		HTMLAudioElement | undefined
	>(undefined);

	const playAudio = (src: string) => {
		if (currentlyAudio) {
			currentlyAudio.pause();
		}

		const audio = new Audio(src);

		audio.play();

		setcurrentlyAudio(audio);
	};

	useEffect(() => {
		function handleVisibilityChange() {
			if (isInteractedThePage) {
				if (document.visibilityState === "hidden") {
					playAudio("/audio/come-back-to-this-tab.mp3");
				} else if (document.visibilityState === "visible") {
					console.log("The user returned to the page.");

					if (currentlyAudio) {
						currentlyAudio.pause();
					}
				}
			}
		}

		function handleBeforeUnload(event: BeforeUnloadEvent) {
			if (isInteractedThePage) {
				event.preventDefault();

				// Audios cannot be reproduced before the user closes the web
				// playAudio("/audio/bye.mp3");

				// You can print messages by console, but alerts can no longer be shown or customized
				console.log("estoy saliendo...");
				// alert("...");
				// return (event.returnValue = "Are you sure you want to exit?");
			}
		}

		const toggleEventsListener = (type: "add" | "remove") => {
			const methodName =
				type === "add" ? "addEventListener" : "removeEventListener";

			window[methodName]("beforeunload", handleBeforeUnload);
			document[methodName]("visibilitychange", handleVisibilityChange);
			window[methodName]("focus", handleVisibilityChange);
		};

		toggleEventsListener("add");

		return () => {
			toggleEventsListener("remove");
		};
	}, [isInteractedThePage, currentlyAudio]);

	return (
		<main className={styles.main}>
			<div className={styles.description}>
				<p>Just a concept practice on some window functionalities</p>

				<div>
					<a href="https://www.linkedin.com/in/andreinariera/" target="_blank">
						By Andreina Riera
					</a>
				</div>
			</div>

			<div className={styles.center}>
				<div className={styles.content}>
					<p>Window events are funny</p>

					{isInteractedThePage ? (
						<ButtonFullScreen className="btn btn-primary" />
					) : (
						<button
							className="btn"
							onClick={() => {
								try {
									setIsInteractedThePage(true);

									playAudio(
										"/audio/unable-to-play-audio-without-interaction.mp3"
									);
								} catch (error) {
									console.error(error);
								}
							}}>
							Click me!
						</button>
					)}
				</div>
			</div>

			<div className={styles.grid}>
				{[
					{
						href: "https://developer.chrome.com/blog/autoplay?hl=es-419",

						title: <>Audio play</>,

						content: (
							<>
								Audio playback is not allowed without prior interaction on the
								page
							</>
						)
					},
					{
						href: "https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API",

						title: <>Tab visualization</>,

						content: (
							<>
								With the VisibilityChange and Focus events it can be detected
								when the user stops seeing the website tab
							</>
						)
					},
					{
						href: "https://developer.mozilla.org/es/docs/Web/API/Element/requestFullscreen",

						title: <>Fullscreen</>,

						content: (
							<>
								With JavaScript, you can enter and exit fullscreen
								programmatically, allowing for a more immersive viewing
								experience of the page
							</>
						)
					},
					{
						href: "https://developer.mozilla.org/es/docs/Web/API/Element/requestFullscreen",

						title: <>Before unload</>,

						content: (
							<>
								It is no longer possible to display customized messages before
								the user leaves the page, but a predefined confirmation alert
								can be shown.
							</>
						)
					}
				].map((card, i) => (
					<a
						href={card.href}
						key={i}
						className={styles.card}
						target="_blank"
						rel="noopener noreferrer">
						<h2>
							{card.title} <span>-&gt;</span>
						</h2>

						<p>{card.content}</p>
					</a>
				))}
			</div>
		</main>
	);
}
