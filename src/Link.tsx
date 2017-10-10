import { LocationDescriptor } from 'history';
import * as invariant from 'invariant';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { connect } from 'react-redux';
import {
  push as pushActionCreator,
  replace as replaceActionCreator,
} from 'react-router-redux';

const isModifiedEvent = (event: React.MouseEvent<HTMLAnchorElement>) =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

interface LinkDispatchProps {
  pushUrl: typeof pushActionCreator;
  replaceUrl: typeof replaceActionCreator;
}

export interface LinkOwnProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  innerRef?: React.Ref<HTMLAnchorElement>;
  replace?: boolean;
  to: LocationDescriptor;
}

type LinkProps = LinkDispatchProps & LinkOwnProps;

class Link extends React.Component<LinkProps> {
  public static defaultProps = {
    replace: false,
  };

  public static propTypes = {
    onClick: PropTypes.func,
    target: PropTypes.string,
    replace: PropTypes.bool,
    to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]).isRequired,
    innerRef: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ])
  };

  public static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired,
        createHref: PropTypes.func.isRequired
      }).isRequired
    }).isRequired
  };

  private handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { onClick, target } = this.props;

    if (onClick) {
      onClick(e);
    }

    if (
      !e.defaultPrevented && // onClick prevented default
      e.button === 0 &&      // ignore right clicks
      !target &&             // let browser handle "target=_blank" etc.
      !isModifiedEvent(e)    // ignore clicks with modifier keys
    ) {
      e.preventDefault();

      const { pushUrl, replace, replaceUrl, to } = this.props;

      if (replace) {
        replaceUrl(to);
      } else {
        pushUrl(to);
      }
    }
  };

  public render(): JSX.Element {
    const {
      innerRef,
      pushUrl,
      replace,
      replaceUrl,
      to,
      ...props
    } = this.props;

    invariant(
      this.context.router,
      'You should not use <Link> outside a <Router>'
    );

    const href = this.context.router.history.createHref(
      typeof to === 'string' ? { pathname: to } : to
    );

    return <a {...props} onClick={this.handleClick} href={href} ref={innerRef}/>
  }
}

export default connect<undefined, LinkDispatchProps, LinkOwnProps>(
  undefined,
  {
    pushUrl: pushActionCreator,
    replaceUrl: replaceActionCreator,
  }
)(Link);
