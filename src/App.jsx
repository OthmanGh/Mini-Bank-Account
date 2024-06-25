import Customer from './components/CreateCustomer';
import BalanceDisplay from './components/BalanceDisplay';
import AccountOperations from './components/AccountOperations';
import CreateCustomer from './components/CreateCustomer';

function App() {
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      <CreateCustomer />
      <Customer />
      <AccountOperations />
      <BalanceDisplay />
    </div>
  );
}

export default App;
