# react-router-redux-dom-link
[![TypeScript][typescript-badge]][typescript]

[`react-router-dom`](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)&#39;s
[`Link`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/Link.js)
component equivalent for [`react-router-redux`](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux). 

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Contribute](#contribute)
- [License](#license)

## Install

If you haven't already please setup your store and router like it is suggested in the
[`react-router-redux` README](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-redux/README.md)

```
yarn add react-router-redux-dom-link
```

or

```
npm i --save react-router-redux-dom-link
```

## Usage

```jsx
import Link from 'react-router-redux-dom-link';

export default const AboutLinkComponent () => (
    <Link to="/about">Your a-tag content</Link>
);
```

## API
**Note**: You could use all `HTMLAnchorElement` properties along with specific `Link` properties as well.

* **replace**  
    *Type*:         `boolean`  
    *Default:*      `false`  
    *Description*:  Whether to push or replace the url provided to `to` in the
                    browser history.  
    *Example*:
    ```JSX
    import Link from 'react-router-redux-dom-link'

    export default const AboutLinkComponent () => (
        <Link to="/about" replace>This link replaces the current URL</Link>
    )
    ```  
* **to**  
    *Type:*         `string`  
    *Description:*  The destination path of the Link. If handled by component the
                    component code this path gets pushed/replaced into the browser
                    history. If handled by the browser this path will be handled
                    like if you had provided it to the `href` attribute.

    *Example*:
    ```JSX
    import Link from 'react-router-redux-dom-link'

    export default const AboutLinkComponent () => (
        <Link to="/about">Simple link</Link>
    )
    ```  
* **to**
    *Type:*         `{ hash?: string, pathname?: string, search?: string, state?: any }`  
    *Description*   Object that describes the destination path. It can have following properties:  
    
    * **pathname**: A string representing the path to link to.  
    * **search**: A string representation of query parameters.  
    * **hash**: A hash to put in the URL, e.g. `#a-hash`.  
    * **state**: State to persist to the `location`.  
                    
    *Example*:
    ```jsx
    import Link from 'react-router-redux-dom-link'

    export default const UserLinkComponent () => (
        <Link 
            to={{
                pathname: '/users',
                search: '?sort=name',
                hash: '#the-hash',
                state: { fromDashboard: true }
            }}
        >
            User link
        </Link>
    )
    ```
    

## Contribute

PRs welcome.

## License

MIT © Mathis Wiehl

[typescript]: http://www.typescriptlang.org/
[typescript-badge]: https://img.shields.io/badge/TypeScript-friendly-blue.svg
