import React from 'react';
import {observable, toJS} from 'mobx'
import {inject, observer} from 'mobx-react'

@inject(({stores: {loading, randomUser}}) => {
    return {
        randomUser,
        loading: loading.models.randomUser
    }
})
@observer
class RandomUser extends React.Component {

    render() {
        const {loading, randomUser} = this.props;

        const {user, message, fetchUser: onFetchUser} = randomUser;

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
        } else if(message){
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
                    <button type='button' onClick={onFetchUser}>
                        Fetch User
                    </button>
                </div>
                {html}
            </div>
        )
    }
}

export default RandomUser;