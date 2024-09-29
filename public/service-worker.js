self.addEventListener("push", function (event) {
	console.log("Push event received", event); // Log the push event
	const options = {
		body: event.data.text(),
		icon: "./images/image.png",
	};
	event.waitUntil(
		self.registration.showNotification("Push Notification", options)
	);
});
