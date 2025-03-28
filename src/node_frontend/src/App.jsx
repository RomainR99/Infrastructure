import { Suspense, lazy } from "react";
import ErrorBoundary from "./ErrorBoundary";

const DataTable = lazy(() => import("./DataTable"));

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Chargement en cours...</div>}>
        <main>
          <DataTable />
        </main>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;

