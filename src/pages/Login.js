import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: '',
      senhaInput: '',
      buttonDisable: true,
    };
  }

  hendleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, () => this.emailValidation());
  }

  emailValidation = () => {
    const { emailInput, senhaInput } = this.state;
    const FIVE = 5;
    const validEmail = emailInput.includes('@');
    const validEmail2 = emailInput.includes('.com');
    const validSenha = senhaInput.length > FIVE;
    if (validSenha && validEmail && validEmail2) {
      this.setState({ buttonDisable: false });
    } else {
      this.setState({ buttonDisable: true });
    }
  }

  render() {
    const { emailInput, senhaInput, buttonDisable } = this.state;
    return (
      <section>
        <label htmlFor="emailInput">
          Email:
          <input
            data-testid="email-input"
            name="emailInput"
            id="emailInput"
            type="text"
            value={ emailInput }
            onChange={ this.hendleChange }
          />
        </label>
        <label htmlFor="senhaInput">
          Senha:
          <input
            data-testid="password-input"
            name="senhaInput"
            id="senhaInput"
            type="password"
            value={ senhaInput }
            onChange={ this.hendleChange }
          />
        </label>
        <button
          type="button"
          disabled={ buttonDisable }
        >
          Entrar
        </button>
      </section>
    );
  }
}

export default Login;
