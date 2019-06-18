import React from 'react';
import {observer, inject} from 'mobx-react';

@inject(({stores}) => {
    return {
        counter: stores.counter,
        loading: stores.loading.models.counter,
    }
})
@observer
class Counter extends React.Component {

    incrementIfOdd = () => {

        const {counter} = this.props;

        if (counter.value % 2 !== 0) {
            counter.increment();
        }
    }

    incrementAsync = () => {

        const {counter} = this.props;

        setTimeout(counter.increment, 1000)
    }

    render() {

        const {counter, loading} = this.props;

        if (loading) {
            return (<div>加载中...</div>);
        }

        return (
            <div>
                Clicked: {counter.value} times
                {' '}
                <button onClick={counter.increment}>
                    +
                </button>
                {' '}
                <button onClick={counter.decrement}>
                    -
                </button>
                {' '}
                <button onClick={this.incrementIfOdd}>
                    Increment if odd
                </button>
                {' '}
                <button onClick={this.incrementAsync}>
                    Increment async
                </button>
            </div>
        )
    }
}

export default Counter;