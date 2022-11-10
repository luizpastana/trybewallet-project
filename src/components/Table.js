import React from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { actionDelete, actionEdit, actionExibeForm } from '../actions';
import EditExpenses from './EditExpenses';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
    };
  }

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

  renderEdit = (id) => {
    const { editItem, showForm } = this.props;
    showForm(false);
    editItem(id);
    this.setState({ showEdit: true });
  }

  showEditOff = () => {
    this.setState({ showEdit: false });
  }

  render() {
    const { despesas, deleteItem } = this.props;
    const { showEdit } = this.state;
    return (
      <>
        <table className="table table-dark table-striped">
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
              <td className="d-flex">
                <button
                  className="btn btn-primary"
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => this.renderEdit(despesa.id) }
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
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
        {showEdit && <EditExpenses showEditOff={ this.showEditOff } />}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  despesas: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (id) => dispatch(actionDelete(id)),
  editItem: (id) => dispatch(actionEdit(id)),
  showForm: (bool) => dispatch(actionExibeForm(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  despesas: PropTypes.arrayOf.isRequired,
  deleteItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  showForm: PropTypes.func.isRequired,
};
