import styles from './ContactsPage.module.css';
import React from 'react';

export const ContactsPage = () => {
  return (
		<div className={styles.contacts}>
			<h2>Contacts</h2>
			<h3>Author: Lavrentiev Yurii</h3>
			<div>Phone: +380666666666</div>
			<div>Email: yuri.lavrentiev.js@gmail.com</div>
			<div>
				<a
					href="https://www.facebook.com/yuri.lavrentiev"
					target="_blank"
					rel="noreferrer"
				>
					Facebook
				</a>
			</div>
			<div>
				<a
					href="https://instagram.com/mryurigagarin?igshid=YmMyMTA2M2Y="
					target="_blank"
					rel="noreferrer"
				>
					Instagram
				</a>
			</div>
			<div>
				<a
					href="https://github.com/yurilavrentiev"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
			</div>
			<div>
				<a
					href="https://youtube.com/channel/UC9o65Evuy91LSP-Ir8gi9cw"
					target="_blank"
					rel="noreferrer"
				>
					YouTube
				</a>
			</div>
		</div>
	);
}

