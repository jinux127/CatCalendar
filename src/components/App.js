import Loading from './Loading.js';
import { request } from './api.js';
import Breadcrumb from './Breadcrumb.js';

export default function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
    selectedFilePath: null,
    isLoading: false,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    loading.setState(this.state.isLoading);
  };

  const loading = new Loading({
    $app,
    initialState: this.state.isLoading,
  });

  const init = async () => {
    try {
      this.setState({
        ...this.state,
        isRoot: true,
        isLoading: true,
      });
      const rootNodes = await request();
      console.log(rootNodes);
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        ...this.state,
        isLoading: false,
      });
    }
  };

  init();
}
