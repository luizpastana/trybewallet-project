export const EMAIL_LOGIN = 'EMAIL_LOGIN';

export const actionLogin = (email) => ({
  type: EMAIL_LOGIN,
  payload: email,
});
