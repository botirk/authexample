import React from 'react';
import { createRoot } from 'react-dom/client';

import Index from '../routes/index';

it("renders", () => {
  createRoot(document.createElement("div")).render(<Index/>);
});