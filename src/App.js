import { Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import Contact from './pages/contact';
import Tambah from './pages/tambah';
import Edit from './pages/edit';

const App = () => {
  return (
    <Container style={{ marginTop: 80 }}>
      <Switch>
        <Route exact path="/" component={Contact} />
        <Route exact path="/tambah" component={Tambah} />
        <Route exact path="/edit/:id" component={Edit} />
      </Switch>
    </Container>
  );
};

export default App;
