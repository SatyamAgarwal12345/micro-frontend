# Micro-Frontend Integration with Module Federation

This repository demonstrates the implementation of a micro-frontend architecture using **Webpack Module Federation**. The project consists of an **MFE** application integrating two independent micro-frontends: **Cake** and **IceCream**, both of which manage their own state and communicate with the MFE using a `pubSub` utility.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Setup Instructions](#setup-instructions)
3. [Webpack Configuration Explained](#webpack-configuration-explained)
4. [Running the Project](#running-the-project)
5. [Communication Between Microservices](#communication-between-microservices)
6. [Key Features](#key-features)

---

## Project Structure

```plaintext
root (micro-frontend)
├── mfe
│   ├── src
│   │   ├── components
│   │   │   ├── CakeCart.jsx
│   │   │   ├── IceCreamCart.jsx
│   │   │   └── App.jsx----- 2 microservices cake and icecream along with CakeCart and IcecreamCart
│   │   ├── style
│   │   │   └── cart.css
│   │   └── utils
│   │       └── pubSub.js
│   └── webpack.config.js
├── cake
│   ├── src
│   │   ├── components
│   │   │   └── newCake.js
│   │   └── utils
│   │       └── pubSub.js
│   └── webpack.config.js
└── icecream
    ├── src
    │   ├── components
    │   │   └── newIC.jsx
    │   └── utils
    │       └── pubSub.js
    └── webpack.config.js
```

---

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/SatyamAgarwal12345/micro-frontend.git
   cd micro-frontend
   ```
2. Install dependencies for each project:
   ```bash
   cd mfe && npm install
   cd cake && npm install
   cd icecream && npm install
   ```
3. Start the development servers:
   ```bash
   # In separate terminals
   cd mfe && npm start
   cd cake && npm start
   cd icecream && npm start
   ```
4. Open `http://localhost:4000` in your browser to view the MFE application.
5. Open `http://localhost:4001` in your browser to view the Cake Micro-Frontend.
6. Open `http://localhost:4002` in your browser to view the Ice Cream Micro-Frontend.

---

## Webpack Configuration Explained

### MFE Application

```javascript
new ModuleFederationPlugin({
  name: "mfe",
  filename: "remoteEntry.js",
  remotes: {
    cakeMf: "cake@http://localhost:4001/remoteEntry.js",
    iceCreamMf: "icecream@http://localhost:4002/remoteEntry.js",
  },
  exposes: {
    "./utils/pubSub": "./src/utils/pubSub.js",
  },
  shared: {
    react: { singleton: true, eager: true, requiredVersion: deps.react },
    "react-dom": { singleton: true, eager: true, requiredVersion: deps["react-dom"] },
  },
});
```

- **Remotes**: Declares micro-frontends (Cake and IceCream) that the MFE can consume.
- **Exposes**: Shares the `pubSub` utility for state management.
- **Shared**: Ensures React and ReactDOM are singleton to prevent version conflicts.

### Cake Micro-Frontend

```javascript
new ModuleFederationPlugin({
  name: "cake",
  filename: "remoteEntry.js",
  exposes: {
    "./Cake": "./src/components/newCake.js",
    "./utils/pubSub": "./src/utils/pubSub.js",
  },
  shared: {
    react: { singleton: true, requiredVersion: deps.react },
    "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
  },
});
```

- **Exposes**: Makes the Cake component and its local `pubSub` utility available.

### IceCream Micro-Frontend

```javascript
new ModuleFederationPlugin({
  name: "icecream",
  filename: "remoteEntry.js",
  remotes: {
    mfe: "mfe@http://localhost:4000/remoteEntry.js",
  },
  exposes: {
    "./IceCream": "./src/components/newIC.jsx",
    "./utils/pubSub": "./src/utils/pubSub.js",
  },
  shared: {
    react: { singleton: true, eager: true, requiredVersion: deps.react },
    "react-dom": { singleton: true, eager: true, requiredVersion: deps["react-dom"] },
  },
});
```

- **Remotes**: Allows IceCream to consume the MFE application.
- **Exposes**: Shares its IceCream component and local `pubSub` utility.

---

## Running the Project

- Start all micro-frontends and the MFE application using `npm start`.
- Navigate to `http://localhost:4000` to view the integration.
- Perform interactions in the Cake or IceCream micro-frontends to see updates in the MFE's Cart component.

---

## Communication Between Microservices

### Using `pubSub`

Each micro-frontend has its local `pubSub` utility. When an event occurs (e.g., adding an item), the utility broadcasts the event:

#### Example: Cake Component

```javascript
import { pubSub } from "./utils/pubSub";

pubSub.subscribe("cakeStateChange", (data) => {
  console.log("Cart updated with Cake data:", data);
});

pubSub.publish("cakeStateChange", { count: 5 });
```

#### Example: IceCream Component

```javascript
import { pubSub } from "./utils/pubSub";

pubSub.subscribe("iceCreamStateChange", (data) => {
  console.log("Cart updated with IceCream data:", data);
});

pubSub.publish("iceCreamStateChange", { count: 3 });
```

### MFE Integration

The MFE application renders `CakeCart` and `IceCreamCart` components, which subscribe to `pubSub` events from their respective micro-frontends:

#### `App.jsx`

```javascript
import React from "react";
import CakeCart from "./components/CakeCart";
import IceCreamCart from "./components/IceCreamCart";
import Cake from "cakeMf/Cake";
import IceCream from "iceCreamMf/IceCream";

const App = () => (
  <div>
    <h1>Welcome to the MFE Application</h1>
    <Cake />
    <IceCream />
    <CakeCart />
    <IceCreamCart />
  </div>
);

export default App;
```

---

## Key Features

- Modular micro-frontend structure.
- Independent state management using `pubSub` utilities.
- Seamless integration using Webpack Module Federation.
- Live communication between components hosted in separate micro-frontends.

