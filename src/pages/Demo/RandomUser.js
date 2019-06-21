import React from 'react';
import {inject} from 'mobx-react'
import {toJS} from "mobx";

@inject(({stores: {dispatch, loading, randomUser}}) => {
    return {
        dispatch,
        randomUser,
        loading: loading.models.randomUser
    };
})
class RandomUser extends React.PureComponent {

    onFetchUser = () => {
        const {dispatch} = this.props;
        dispatch({
            type: 'randomUser/fetchUser'
        })
    }

    render() {
        const {loading, randomUser} = this.props;

        const {user, message} = randomUser;

        let html = null;

        if (loading) {
            html = (
                <div>
                    <p>
                        <img
                            src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1656427518,3440311722&fm=26&gp=0.gif'
                            alt=""
                        />
                    </p>
                </div>
            );
        } else if (user) {
            html = (
                <div>
                    <p>
                        {user.name}{' - '}{user.email}
                    </p>
                    <p>
                        <img src={user.picture} alt=""/>
                    </p>
                </div>
            );
        } else if (message) {
            html = (
                <div>
                    <p>{message}</p>
                    <p><img src='http://www.999zx.cn/adm_file/images/201811/infoCont/20181124-169314-41180.jpg' alt=""/>
                    </p>
                </div>
            );
        }

        return (
            <div>
                <div>
                    <button type='button' onClick={this.onFetchUser}>
                        Fetch User
                    </button>
                </div>
                {html}
            </div>
        )
    }
}

export default RandomUser;