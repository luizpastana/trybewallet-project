import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { actionLogin } from '../actions';

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

  hendleSubmit = (e) => {
    e.preventDefault();
    const { emailInput } = this.state;
    const { history, submitLogin } = this.props;
    submitLogin(emailInput);
    this.setState({ emailInput: '', senhaInput: '' });
    history.push('/carteira');
  }

  render() {
    const { emailInput, senhaInput, buttonDisable } = this.state;
    return (
      <section className="container d-flex flex-column pt-4 bg-dark text-white">
        <div className="mx-auto">
          <label htmlFor="emailInput">
            Email :
            <input
              data-testid="email-input"
              name="emailInput"
              id="emailInput"
              type="text"
              value={ emailInput }
              onChange={ this.hendleChange }
            />
          </label>
        </div>
        <div className="flex-wrap mx-auto">
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
        </div>
        <button
          className="btn btn-secondary mx-auto"
          type="button"
          disabled={ buttonDisable }
          onClick={ this.hendleSubmit }
        >
          Entrar
        </button>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitLogin: (email) => dispatch(actionLogin(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.shape.isRequired,
  submitLogin: PropTypes.func.isRequired,
};
