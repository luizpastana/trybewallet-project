import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI } from '../actions';

class Header extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  valueExibition = () => {
    const { despesas } = this.props;
    const value = despesas.reduce((acc, cur) => {
      const coin = cur.currency;
      const convert = cur.exchangeRates[coin];
      return acc + (Number(cur.value) * convert.ask);
    }, 0);
    return value.toFixed(2);
  }

  render() {
    const { userEmail } = this.props;

    return (
      <header>
        <span
          data-testid="email-field"
        >
          {userEmail}
        </span>
        <p
          data-testid="total-field"
        >
          {this.valueExibition()}
        </p>
        <p
          data-testid="header-currency-field"
        >
          BRL
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  despesas: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  despesas: PropTypes.shape.isRequired,
};
