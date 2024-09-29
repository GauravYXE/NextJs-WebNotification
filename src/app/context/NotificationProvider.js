// import { createContext, useContext, useEffect } from "react";
// import knock from "../lib/knock";

// const NotificationContext = createContext();

// export const NotificationProvider = ({ children }) => {
// 	useEffect(() => {
// 		// Subscribe to notifications
// 		const unsubscribe = knock.subscribe((notification) => {
// 			// Handle incoming notifications
// 			console.log(notification); // You can customize how to show notifications
// 		});

// 		return () => {
// 			unsubscribe();
// 		};
// 	}, []);

// 	return (
// 		<NotificationContext.Provider value={{ knock }}>
// 			{children}
// 		</NotificationContext.Provider>
// 	);
// };

// export const useNotification = () => {
// 	return useContext(NotificationContext);
// };
