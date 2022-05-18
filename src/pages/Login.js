import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: '',
    };
  }

  render() {
    const { nameInput } = this.state;
    return (
      <section>
        <label htmlFor="nameInput">
          Email:
          <input
            data-testid="email-input"
            name="nameInput"
            id="nameInput"
            type="text"
            value={ nameInput }
          />
        </label>
        <label htmlFor="nameInput">
          Senha:
          <input
            data-testid="password-input"
            name="senhaInput"
            id="senhaInput"
            type="text"
          />
        </label>
        <button
          type="button"
        >
          Entrar
        </button>
      </section>
    );
  }
}

export default Login;
