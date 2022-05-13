import Loading from './Loading.js';
import { request } from './api.js';
import Breadcrumb from './Breadcrumb.js';

const cache = {};

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
    breadcrumb.setState(this.state.depth);
  };

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: this.state.depth,
    onClick: (index) => {
      if (index === null) {
        this.setState({
          ...this.state,
          depth: [],
          isRoot: true,
          nodes: cache.rootNodes,
        });
        return;
      }

      if (index === this.state.depth.length - 1) {
        console.log('여긴가');
        return;
      }
      const nextState = { ...this.state };
      const nextDepth = this.state.depth.slice(0, index + 1);

      this.setState({
        ...nextState,
        depth: nextDepth,
        nodes: cache[nextDepth[nextDepth.length - 1].id],
      });
    },
  });

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
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
      });

      cache.rootNodes = rootNodes;
      console.log(cache.rootNodes);
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
