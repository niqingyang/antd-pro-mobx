import React, {PureComponent} from 'react';
import {inject, observer} from "mobx-react";
import styles from './GridContent.less';

@inject((setting) => ({contentWidth: setting.contentWidth}))
class GridContent extends PureComponent {
    render() {
        const {contentWidth, children} = this.props;
        let className = `${styles.main}`;
        if (contentWidth === 'Fixed') {
            className = `${styles.main} ${styles.wide}`;
        }
        return <div className={className}>{children}</div>;
    }
}

export default GridContent;
