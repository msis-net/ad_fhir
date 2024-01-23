import { atom } from 'nanostores';

const initialValue = [
	{
		account : 'xx',
		depid : 'xx',
		div : '管理xx者',
		kanri : '',
		name : '管太',
		role : 'xx',
		sid : 1,
		timeout : 36000
	}
];

const userStatus = atom(initialValue);

const addUser = function addUser(user:any) {
	userStatus.set([...userStatus.get(), user]);
};

export { userStatus, addUser };
