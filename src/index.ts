/* eslint-disable no-console */
import Router from './utils/Router';
import ChatPage from './pages/chat/chat';
import SigninPage from './pages/signin/signin';
import SignupPage from './pages/signup/signup';
import ProfilePage from './pages/profile/profile';
import ErrorPage from './pages/error/error';
import AuthController from './controllers/AuthController';
import './styles/global.scss';

document.addEventListener('DOMContentLoaded', async () => {
	const router = new Router();

	router.use('/chat', ChatPage).use('/signin', SigninPage).use('/signup', SignupPage);

	try {
		await AuthController.fetchUser();
		router.go('/chat');
	} catch (e) {
		console.log('Error fetching user', e);
		router.go('/signin');
	}

	router.start();
});
