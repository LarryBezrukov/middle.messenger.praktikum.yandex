export enum ValidationType {
	Email = 'email',
	Name = 'name',
	Login = 'login',
	Password = 'password',
	Phone = 'phone',
	Image = 'image',
	ChatName = 'chatName',
	Id = 'id',
}

class Validator {
	email(value: string): [boolean, string] {
		const result =
			// eslint-disable-next-line no-control-regex
			/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
				value,
			);

		return [result, 'Invalid email address'];
	}

	name(value: string): [boolean, string] {
		return [
			/[A-ZА-Я][a-zа-я-]*/.test(value),
			'This field can only contain latin or cyrillic letters, «_» and has to start with a capital',
		];
	}

	login(value: string): [boolean, string] {
		return [
			/(?!^\d+$)[A-Za-z0-9_-]{3,20}/.test(value),
			'This field can contain only latin letters, number, «_» and «-»',
		];
	}

	password(value: string): [boolean, string] {
		return [
			/[A-Za-z0-9]{8,40}/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value),
			'Password must contain at least one uppercase letter, one number and at least 8 characters',
		];
	}

	phone(value: string): [boolean, string] {
		return [/\+?[0-9]{10,15}/.test(value), 'Invalid phone number'];
	}

	image(value: string): [boolean, string] {
		return [
			/\.(jpg|jpeg|png)$/.test(value),
			'Invalid image format, only JPG, JPEG and PNG are accepted',
		];
	}

	chatName(value: string): [boolean, string] {
		return [/[A-ZА-Яa-zа-я0-9_-]{1,40}/.test(value), 'Chat name cannot be empty'];
	}

	id(value: string): [boolean, string] {
		return [/[0-9]/.test(value), 'Id can only contain numbers'];
	}

	validate(type: ValidationType, value: string): [boolean, string] {
		switch (type) {
			case ValidationType.Email:
				return this.email(value);
			case ValidationType.Login:
				return this.login(value);
			case ValidationType.Name:
				return this.name(value);
			case ValidationType.Password:
				return this.password(value);
			case ValidationType.Phone:
				return this.phone(value);
			case ValidationType.Image:
				return this.image(value);
			case ValidationType.ChatName:
				return this.chatName(value);
			case ValidationType.Id:
				return this.id(value);
			default:
				return [!!value.length, 'This field cannot be empty'];
		}
	}
}

export default new Validator();
