import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
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
            <td>{despesa.currency}</td>
            <td>{despesa.tag}</td>
            <td>{despesa.tag}</td>
            <td>{despesa.description}</td>
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
