import {namespace, loading} from 'mobx-react-stores';
import {fetchRandomUser} from "@/services/demo";

@namespace("randomUser")
class RandomUser {

    user;

    message;

    @loading
    fetchUser = async () => {

        this.user = null;
        this.message = null;

        const response = await fetchRandomUser().catch(this.onRejected);

        if (response.results) {
            const user = response.results[0];

            this.change({
                user: {
                    name: `${user.name.first} ${user.name.last}`,
                    email: user.email,
                    picture: user.picture.large
                },
                message: null
            });
        }
    }

    change = ({user, message}) => {
        this.user = user;
        this.message = message;
    }

    onRejected = (e) => {
        return {
            status: 500,
            message: e.message
        }
    }
}

export default new RandomUser();