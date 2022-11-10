import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionForm } from '../actions';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: '',
      value: '',
      description: '',
      tag: '',
      method: '',
      exchangeRates: undefined,
      id: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  fetchExchangeRates = async () => {
    const { handleSubmitForm, id } = this.props;
    const url = 'https://economia.awesomeapi.com.br/json/all';
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.setState({ exchangeRates: data, id: id + 1 },
        () => handleSubmitForm(this.state));
      this.setState({
        currency: '',
        value: '',
        description: '',
        tag: '',
        method: '',
        exchangeRates: undefined,
        id: '',
      });
    } catch (error) {
      console.error(error);
    }
  }

  renderOptions = () => {
    const { currency } = this.state;
    const { coin = [] } = this.props;
    // console.log(coin);
    return (
      <label
        htmlFor="currency"
        className="input-group-text"
      >
        Moeda:
        <select
          className="form-control"
          id="currency"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          {coin.map((c, i) => <option key={ i } value={ `${c}` }>{`${c}`}</option>)}
        </select>
      </label>
    );
  }

  renderForm = () => {
    const { value, description, tag, method } = this.state;
    return (
      <form>
        <div className="d-flex">
          <label
            htmlFor="value"
            className="input-group-text"
          >
            Valor:
            <input
              className="form-control"
              data-testid="value-input"
              id="value"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label
            htmlFor="description"
            className="input-group-text"
          >
            Descrição:
            <input
              className="form-control"
              data-testid="description-input"
              id="description"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          {this.renderOptions()}
          <label
            htmlFor="tag"
            className="input-group-text"
          >
            Categoria:
            <select
              className="form-control"
              id="tag"
              name="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentacao">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saude">Saúde</option>
            </select>
          </label>
          <label
            htmlFor="method"
            className="input-group-text"
          >
            Pagamento:
            <select
              className="form-control"
              id="method"
              name="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <button
            type="button"
            className="btn btn-primary"
            onClick={ this.fetchExchangeRates }
          >
            Adicionar despesa
          </button>
        </div>
      </form>
    );
  }

  render() {
    const { show } = this.props;
    // console.log(show);
    return (show ? this.renderForm() : <p>Carregando</p>);
  }
}

const mapStateToProps = (state) => ({
  coin: state.wallet.currencies,
  id: state.wallet.expenses.length - 1,
  show: state.wallet.exibeForm,
});

const mapDispatchToProps = (dispatch) => ({
  handleSubmitForm: (form) => dispatch(actionForm(form)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  coin: PropTypes.arrayOf.isRequired,
  handleSubmitForm: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
};
