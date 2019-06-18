import React from 'react';
import {Link} from 'react-router-dom';
import {injectIntl} from 'react-intl';
import Exception from '@/components/Exception';

const Exception500 = injectIntl(({intl: {formatMessage}}) => (
    <Exception
        type="500"
        desc={formatMessage({id: 'app.exception.description.500'})}
        linkElement={Link}
        backText={formatMessage({id: 'app.exception.back'})}
    />
));

export default Exception500;
