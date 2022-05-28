export const EMAIL_LOGIN = 'EMAIL_LOGIN';
export const CURRENCY = 'CURRENCY';
export const SUBMIT_FORM = 'SUBMIT_FORM';
export const DELETE = 'DELETE';
export const EDIT = 'EDIT';

export const actionLogin = (email) => ({
  type: EMAIL_LOGIN,
  payload: email,
});

export const actionCurrence = (currence) => ({
  type: CURRENCY,
  payload: currence,
});

export function fetchAPI() {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  return async (dispatch) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const arr = Object.values(data);
      const arrFilter = arr.filter((a) => a.codein !== 'BRLT');
      const coinCode = arrFilter.map((f) => f.code);
      dispatch(actionCurrence(coinCode));
    } catch (error) {
      console.error(error);
    }
  };
}

export const actionForm = (form) => ({
  type: SUBMIT_FORM,
  payload: form,
});

export const actionDelete = (id) => ({
  type: DELETE,
  payload: id,
});

export const actionEdit = (id) => ({
  type: EDIT,
  payload: id,
});
