const express = require("express");
const webPush = require("web-push");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const vapidKeys = {
	publicKey:
		"BCKtPpN04OGyu1UHMp-yd8D8NQXwxc_NycC-S-TmtT3DBPTHYjcOQBNSeDDXAb5fbc5vO6ZfCNeS-M9uCVN46Ko",
	privateKey: "pR7sXVJsXaxtIGK7HElDHUqdoYIhXNjeqjcgwVtEbAQ",
};

webPush.setVapidDetails(
	"mailto:your-email@example.com",
	vapidKeys.publicKey,
	vapidKeys.privateKey
);

const subscriptions = [];

app.post("/api/subscribe", (req, res) => {
	const subscription = req.body;
	subscriptions.push(subscription);
	res.status(201).json({});
});

app.post("/api/notify", (req, res) => {
	const notificationPayload = JSON.stringify({
		title: "New Notification",
		body: "You have a new message!",
		//	icon: "/images/image.png",
	});

	const promises = subscriptions.map((subscription) =>
		webPush.sendNotification(subscription, notificationPayload)
	);

	Promise.all(promises)
		.then(() => res.status(200).json({ message: "Notifications sent!" }))
		.catch((err) => {
			console.error("Error sending notification:", err);
			res.status(500).json({ error: "Failed to send notification" });
		});
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
