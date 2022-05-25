import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionDelete } from '../actions';

class Table extends React.Component {
  coinName = (obj) => {
    const { exchangeRates } = obj;
    const { name } = exchangeRates[obj.currency];
    return name.replace('/Real Brasileiro', '');
  }

  priceValue = (obj) => {
    const { exchangeRates } = obj;
    const { ask } = exchangeRates[obj.currency];
    const result = Number(ask).toFixed(2);
    return result.toString();
  }

  valueConvert = (obj) => {
    const { exchangeRates } = obj;
    const { ask } = exchangeRates[obj.currency];
    const result = (Number(ask) * obj.value).toFixed(2);
    return result.toString();
  }

  render() {
    const { despesas, deleteItem } = this.props;
    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        {despesas.map((despesa) => (
          <tr key={ despesa.id }>
            <td>{despesa.description}</td>
            <td>{despesa.tag}</td>
            <td>{despesa.method}</td>
            <td>{Number(despesa.value).toFixed(2)}</td>
            <td>{this.coinName(despesa)}</td>
            <td>{this.priceValue(despesa)}</td>
            <td>{this.valueConvert(despesa)}</td>
            <td>Real</td>
            <td>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => deleteItem(despesa.id) }
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  despesas: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (id) => dispatch(actionDelete(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  despesas: PropTypes.arrayOf.isRequired,
  deleteItem: PropTypes.func.isRequired,
};
