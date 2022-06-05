import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionForm } from '../actions';

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
    const { despesa } = this.props;
    return { ...despesa,
      currency,
      value,
      description,
      tag,
      method,
    };
  }

  // nao fazer a alteração do etado aqui e sim
  // no walletReducer. precisa criar uma nova ação
  // para enviar a despesa alterada, que esta funcionando corretamente

  // newExpenses = () => {
  //   const { allExpenses, newForm } = this.props;
  //   const editedExpense = this.editExpense();
  //   const newAllExpenses = allExpenses.map((expense) => {
  //     if (expense.id === editedExpense.id) {
  //       return editedExpense;
  //     }
  //     return expense;
  //   });
  //   newForm(newAllExpenses);
  //   // console.log(editedExpense);
  // }

  render() {
    const { value, description, tag, method } = this.state;
    // console.log(despesa);
    // const { value, description, tag, method } = this.state;
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
          onClick={ this.editExpense }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  allExpenses: state.wallet.expenses,
  despesa: state.wallet.edit,
  coin: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  newForm: (form) => dispatch(actionForm(form)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpenses);

EditExpenses.propTypes = {
  despesa: PropTypes.arrayOf.isRequired,
  coin: PropTypes.arrayOf.isRequired,
};
