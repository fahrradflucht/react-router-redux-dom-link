import * as React from 'react';
import { connect } from 'react-redux';
import {
  push as pushActionCreator,
  replace as replaceActionCreator,
} from 'react-router-redux';
import { bindActionCreators, Dispatch } from 'redux';

const isModifiedEvent = (event: React.MouseEvent<HTMLAnchorElement>) =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

interface LinkDispatchProps {
  pushUrl: (location: string) => void;
  replaceUrl: (location: string) => void;
}

export interface LinkOwnProps {
  onClick?: (e?: React.MouseEvent<HTMLAnchorElement>) => void;
  replace?: boolean;
  target?: string;
  to: string;
}

type LinkProps = LinkDispatchProps & LinkOwnProps;

class Link extends React.Component<LinkProps, undefined> {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  public static defaultProps: Partial<LinkOwnProps> = {
    replace: false,
  };

  private handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
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
  }

  public render(): JSX.Element {
    return <a href={this.props.to} onClick={this.handleClick}>{this.props.children}</a>;
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): LinkDispatchProps => bindActionCreators({
  pushUrl: pushActionCreator,
  replaceUrl: replaceActionCreator,
}, dispatch);

export default connect<undefined, LinkDispatchProps, LinkOwnProps>(undefined, mapDispatchToProps)(Link);
