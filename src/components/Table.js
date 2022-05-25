import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
  // constructor(props) {
  //   super(props);
  // };

  coinName = (obj) => {
    const { exchangeRates } = obj;
    // const rate = exchangeRates.filter((exc) => exc === obj.currency);
    const { name } = exchangeRates[obj.currency];
    // const name = exchangeRates[obj.currency].name;
    console.log(name.replace('/Real Brasileiro', ''));
    // console.log(obj, exchangeRates);
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
            <td>{despesa.tag}</td>
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
