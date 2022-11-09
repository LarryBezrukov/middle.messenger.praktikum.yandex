/* eslint-disable no-console */
import Router from './utils/Router';
import ChatPage from './pages/chat/chat';
import SigninPage from './pages/signin/signin';
import SignupPage from './pages/signup/signup';
import ErrorPage from './pages/error/error';
import AuthController from './controllers/AuthController';
// import './styles/global.scss';

document.addEventListener('DOMContentLoaded', async () => {
	const router = new Router();

	router
		.use('/chat', ChatPage)
		.use('/signin', SigninPage)
		.use('/signup', SignupPage)
		.use('/404', ErrorPage, { errorCode: 404, errorText: 'Page not found' })
		.use('/500', ErrorPage, { errorCode: 500, errorText: 'Internal server error' });

	try {
		await AuthController.fetchUser();
		router.go('/chat');
	} catch (e) {
		console.log('Error fetching user', e);

		if (window.location.pathname !== '/chat' && window.location.pathname !== '/') {
			router.go(window.location.pathname);
		} else {
			router.go('/signin');
		}
	}

	router.start();
});
