import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionForm } from '../actions';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coinSelect: '',
      inputValue: '',
      inputDescribe: '',
      category: '',
      method: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  renderOptions = () => {
    const { coinSelect } = this.state;
    const { coin = [] } = this.props;
    return (
      <label
        htmlFor="coinSelect"
      >
        Moeda:
        <select
          id="coinSelect"
          name="coinSelect"
          value={ coinSelect }
          onChange={ this.handleChange }
        >
          {coin.map((c, i) => <option key={ i } value={ `${c}` }>{`${c}`}</option>)}
        </select>
      </label>
    );
  }

  render() {
    const { handleSubmitForm } = this.props;
    const { inputValue, inputDescribe, category, method } = this.state;
    return (
      <form>
        <label
          htmlFor="inputValue"
        >
          Valor:
          <input
            data-testid="value-input"
            id="inputValue"
            name="inputValue"
            value={ inputValue }
            onChange={ this.handleChange }
          />
        </label>
        <label
          htmlFor="inputDescribe"
        >
          Descrição:
          <input
            data-testid="description-input"
            id="inputDescribe"
            name="inputDescribe"
            value={ inputDescribe }
            onChange={ this.handleChange }
          />
        </label>
        {this.renderOptions()}
        <label
          htmlFor="category"
        >
          Categoria:
          <select
            id="category"
            name="category"
            data-testid="tag-input"
            value={ category }
            onChange={ this.handleChange }
          >
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
        <label
          htmlFor="method"
        >
          Pagamento:
          <select
            id="method"
            name="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ handleSubmitForm(this.state) }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  coin: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  handleSubmitForm: (form) => dispatch(actionForm(form)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  coin: PropTypes.arrayOf.isRequired,
  handleSubmitForm: PropTypes.func.isRequired,
};
