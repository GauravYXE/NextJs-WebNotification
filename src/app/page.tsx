"use client";
import React, { useEffect, useCallback } from "react";

export default function Home() {
	const sendNotification = () => {
		if ("Notification" in window && Notification.permission === "granted") {
			new Notification("Hi Gaurav!", {
				body: "This is a notification",
				icon: "./images/image.png",
			});
		}
	};

	const requestNotificationPermission = useCallback(() => {
		if ("Notification" in window) {
			Notification.requestPermission().then(function (permission) {
				if (permission === "granted") {
					console.log("Notification Granted");
					sendNotification();
				}
			});
		}
	}, []);

	useEffect(() => {
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker
				.register("/service-worker.js")
				.then(function (registration) {
					console.log(
						"Service Worker registered with scope:",
						registration.scope
					);
				})
				.catch(function (err) {
					console.error("Service Worker registration failed:", err);
				});
		}
		requestNotificationPermission();
	}, [requestNotificationPermission]);

	const subscribeToPush = async () => {
		const registration = await navigator.serviceWorker.ready;
		const subscription = await registration.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey:
				"BCKtPpN04OGyu1UHMp-yd8D8NQXwxc_NycC-S-TmtT3DBPTHYjcOQBNSeDDXAb5fbc5vO6ZfCNeS-M9uCVN46Ko",
		});
		console.log("Subscribed to push notifications:", subscription);
		await fetch("/api/subscribe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(subscription),
		});
	};

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<h1>Hi, Web Notification</h1>
			<button
				onClick={sendNotification}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2"
			>
				Trigger Notification
			</button>
		</div>
	);
}
