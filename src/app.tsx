import { ParentProps, Suspense, type Component } from 'solid-js';

const App: Component = (props: ParentProps) => {
  return (
    <>
      <Suspense>{props.children}</Suspense>
    </>
  );
};

export default App;
