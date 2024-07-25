const API_KEY = 'AIzaSyAeKEMtH4-vQ3Mn05QKybKpudgPOq4_nrE';

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || 'Authentication failed');
  }

  const data = await response.json();
  return data.idToken;
}

export async function signUp(email, password) {
  return await authenticate('signUp', email, password);
}

export async function signIn(email, password) {
  return await authenticate('signInWithPassword', email, password);
}
