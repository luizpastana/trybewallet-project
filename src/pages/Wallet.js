import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  render() {
    const { userEmail } = this.props;
    return (
      <>
        <header>
          <span
            data-testid="email-field"
          >
            {userEmail}
          </span>
          <p
            data-testid="total-field"
          >
            {0}
          </p>
          <p
            data-testid="header-currency-field"
          >
            BRL
          </p>
        </header>
        <p>Esseé prolint</p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
