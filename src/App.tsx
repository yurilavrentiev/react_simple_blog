import React from "react";
import "./App.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import { Header } from "./components/Header/Header.view";
import { Footer } from "./components/Footer/Footer.view";
import { BlogContent } from "./components/HomePage/BlogContent/BlogContent.view";
import { LoginPage } from "./components/LoginPage/LoginPage.view";
import { ContactsPage } from "./components/ContactsPage/ContactsPage.view";
import { NotFoundPage } from "./components/NotFoundPage/NotFoundPage.view";

import { MyBlogController } from "./MyBlogController.ctrl";
import { observer } from "mobx-react";

export const App = observer(() => {

	const controller = new MyBlogController();
	let location = useLocation();

	return (
		<div className="App">
			<Header controller={controller} />
			<main>
				{controller.isLoggedIn ? (
					<Routes>
						<Route path="/" element={<BlogContent controller={controller}/>} />
						<Route path="/contacts" element={<ContactsPage />} />
						<Route path="/404" element={<NotFoundPage />} />
						<Route
							path="*"
							element={<Navigate to="/404" state={{ from: location }} />}
						/>
					</Routes>
				) : (
					<LoginPage controller={controller} />
				)}
			</main>
			<Footer year={new Date().getFullYear()} />
		</div>
	);
});
