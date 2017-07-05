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

Note that divergant from the API of `react-router-dom`'s `Link` component this
Library doesn't spread your props down to the `HTMLAnchorElement` without
filtering. If you need a property that isn't supported. Feel free to PR.

#### Properties:
* **onClick**  
    *Type*:         `(e?: React.MouseEvent<HTMLAnchorElement>) => void`  
    *Description*:  Callback that gets called when the Element is clicked. If
                    you call `e.preventDefault` the push/replace action won't
                    be triggert.  
    *Example*:  
    ```JSX
    import Link from 'react-router-redux-dom-link'

    export default class AboutLinkComponent extends React.Component {
        constructor() {
            super();
            this.handleClick = this.handleClick.bind(this);
        }

        handleClick(e) {
            if(this.props.unsafedContent) {
                e.preventDefault();
                alert('Please save your content first!');
            }
        }

        render() {
            return (
                <Link to="/about" onClick={this.handleClick}>
                    Your a-tag content
                </Link>);
        }
    }
    ```  
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
* **target**  
    *Type*:         `string`  
    *Description*:  Just your [standard](https://html.spec.whatwg.org/multipage/semantics.html#attr-hyperlink-target)
                    HTMLAnchorElement `target` attribute.

* **to**  
    *Type:*         `string`  
    *Description:*  The destination path of the Link. If handled by component the
                    component code this path gets pushed/replaced into the browser
                    history. If handled by the browser this path will be handled
                    like if you had provided it to the `href` attribute.

* **className**  
    *Type:*         `string`  
    *Description:*  A css className to assign to the link.  This allows styling of the link
    *Example*:
    ```JSX
    import Link from 'react-router-redux-dom-link'

    export default const AboutLinkComponent () => (
        <Link to="/about" replace className='navLink'>This link replaces the current URL</Link>
    )
    ```  
    
## Contribute

PRs welcome.

## License

MIT © Mathis Wiehl

[typescript]: http://www.typescriptlang.org/
[typescript-badge]: https://img.shields.io/badge/TypeScript-friendly-blue.svg
