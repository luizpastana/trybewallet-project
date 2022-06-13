import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionNewExpense, actionExibeForm } from '../actions';

class EditExpenses extends React.Component {
  constructor(props) {
    super(props);
    const { despesa } = this.props;
    this.state = {
      currency: despesa.currency,
      value: despesa.value,
      description: despesa.description,
      tag: despesa.tag,
      method: despesa.method,
    };
  }

  renderOptions = () => {
    const { currency } = this.state;
    const { coin = [] } = this.props;
    // console.log(coin);
    return (
      <label
        htmlFor="currency"
      >
        Moeda:
        <select
          data-testid="currency-input"
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

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  editExpense = () => {
    const { currency, value, description, method, tag } = this.state;
    const { despesa, newForm, showEditOff, showForm } = this.props;
    const newExpense = { ...despesa,
      currency,
      value,
      description,
      tag,
      method,
    };
    showEditOff();
    console.log(newExpense);
    newForm(newExpense);
    showForm(true);
  }

  render() {
    const { value, description, tag, method } = this.state;

    return (
      <form>
        <label
          htmlFor="value"
        >
          Valor:
          <input
            data-testid="value-input"
            id="value"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label
          htmlFor="description"
        >
          Descrição:
          <input
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
        >
          Categoria:
          <select
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
        >
          Pagamento:
          <select
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
          data-testid="edit-btn"
          onClick={ this.editExpense }
        >
          Editar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  despesa: state.wallet.edit,
  coin: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  newForm: (form) => dispatch(actionNewExpense(form)),
  showForm: (bool) => dispatch(actionExibeForm(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpenses);

EditExpenses.propTypes = {
  despesa: PropTypes.arrayOf.isRequired,
  coin: PropTypes.arrayOf.isRequired,
  newForm: PropTypes.func.isRequired,
  showForm: PropTypes.func.isRequired,
  showEditOff: PropTypes.func.isRequired,
};
