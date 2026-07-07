# PROJECT_NAME

A SwissJS application scaffolded with `create-swissjs`.

## Getting started

```bash
pnpm install
pnpm dev
```

Then open [http://localhost:5000](http://localhost:5000).

## Project structure

```
PROJECT_NAME/
├── app/
│   ├── components/       # Shared UI components (.uix)
│   │   ├── Navbar.uix
│   │   ├── Footer.uix
│   │   └── Button.uix
│   ├── pages/            # Page-level components (.uix)
│   │   ├── HomePage.uix
│   │   └── AboutPage.uix
│   ├── public/
│   │   └── index.html    # HTML shell
│   └── main.ui           # App entry point + client-side router
├── dev.mjs               # Dev server (SwiteServer)
└── package.json
```

## SwissJS component syntax

Components live in `.uix` files. Every file must import `SwissComponent`:

```js
import { SwissComponent } from '@swissjs/core';

component MyComponent {
  state { let count: number = 0; }

  _increment() {
    this.count += 1;
    this.scheduleUpdate();
  }

  render() {
    return (
      <div>
        <p>{this.count}</p>
        <button onclick={() => this._increment()}>+</button>
      </div>
    );
  }
}
```

**Key rules:**
- Use `component X { }` — never `export class X extends SwissComponent`
- Import `SwissComponent` from `@swissjs/core` in every `.uix` file
- JSX only inside `render()` — not in helper methods
- Helper methods use `_method()` naming convention
- Call `this.scheduleUpdate()` after mutating state in methods
- Events: `onclick={() => this._method()}`
- Conditionals: `{condition ? <El /> : null}`

## Adding a new page

1. Create `app/pages/MyPage.uix`
2. Import and add a route in `app/main.ui`:
   ```js
   import { MyPage } from './pages/MyPage.uix';
   // inside Router render():
   if (r === '/my-page') return <MyPage />;
   ```

## Docs

Full documentation: [https://swissjs.org/docs](https://swissjs.org/docs)
