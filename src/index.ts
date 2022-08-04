import Router from './utils/Router';
import ChatPage from './pages/chat/chat';
import SigninPage from './pages/signin/signin';
import SignupPage from './pages/signup/signup';
import ProfilePage from './pages/profile/profile';
import ErrorPage from './pages/error/error';
import './styles/global.scss';

document.addEventListener('DOMContentLoaded', () => {
	const router = new Router();

	router
		.use('/chat', ChatPage)
		.use('/signin', SigninPage)
		.use('/signup', SignupPage)
		.use('/profile', ProfilePage)
		.use('/404', ErrorPage, { errorCode: 404, errorText: 'Page not found' })
		.use('/500', ErrorPage, { errorCode: 500, errorText: 'Internal server error' });

	router.start();
});
