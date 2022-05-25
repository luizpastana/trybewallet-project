import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
  coinName = (obj) => {
    const { exchangeRates } = obj;
    const { name } = exchangeRates[obj.currency];
    return name.replace('/Real Brasileiro', '');
  }

  priceValue = (obj) => {
    const { exchangeRates } = obj;
    const { ask } = exchangeRates[obj.currency];
    return Number(ask).toFixed(2);
  }

  render() {
    const { despesas } = this.props;
    console.log(despesas);
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
        {despesas.map((despesa, i) => (
          <tr key={ i }>
            <td>{despesa.description}</td>
            <td>{despesa.tag}</td>
            <td>{despesa.method}</td>
            <td>{despesa.value}</td>
            <td>{this.coinName(despesa)}</td>
            <td>{this.priceValue(despesa)}</td>
            <td>{despesa.tag}</td>
            <td>Real</td>
            <td>Editar/Excluir</td>
          </tr>
        ))}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  despesas: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);

Table.propTypes = {
  despesas: PropTypes.arrayOf.isRequired,
};
