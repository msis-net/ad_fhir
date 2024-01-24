export interface AuthData {
	account : string,
	depid : string,
	div : string,
	kanri : string,
	name : string,
	role : string,
	sid : string,
	timeout : string
}

export async function getAuthuser(id: string | undefined) {
  const userfile = `http://localhost:1234/orca/auth/${id}`
  const response = await fetch(
    userfile,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.status === 404) {
    return null;
  }
  const user = (await response.json()) as AuthData;
  console.log(user)
  sessionStorage.setItem('user', user)
  return user;
}