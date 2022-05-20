import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderOptions = () => {
    const { coin = [] } = this.props;
    console.log(this.props);
    console.log(coin);
    return (
      <label
        htmlFor="coinSelect"
      >
        Moeda:
        <select
          id="coinSelect"
          name="coinSelect"
        >
          {coin.map((c, i) => <option key={ i } value={ `${c}` }>{`${c}`}</option>)}
        </select>
      </label>
    );
  }

  render() {
    return (
      <form>
        <label
          htmlFor="inputValue"
        >
          Valor:
          <input
            data-testid="value-input"
            id="inputValue"
          />
        </label>
        <label
          htmlFor="inputDescribe"
        >
          Descrição:
          <input
            data-testid="description-input"
            id="inputDescribe"
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
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  coin: state.wallet.currencies,
});

export default connect(mapStateToProps)(Form);

Form.propTypes = {
  coin: PropTypes.arrayOf.isRequired,
};
